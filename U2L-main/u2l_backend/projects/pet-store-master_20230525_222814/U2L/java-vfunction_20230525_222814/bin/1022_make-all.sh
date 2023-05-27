#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1022_make-all.sh,v 1.7 2014/01/14 04:20:40 morimoto Exp $
# $Name: rev_1_10 $
#
# Tool Name   : 1022_make-all.sh
# Description : execute compile in order listed Makefile
# Syntax      : 1022_make-all.sh Makefile_list compile_type
# Input       : Makefile_list : Makefile list
#             : compile_type  : comile work type : (hpuxcc|linuxgcc|ca|cproto|pt|clean)
# Output      : compile log file 
#

# comfirm build directory is seted
if [ "`echo $AS_WORK`" = "" ];
then
	echo "Not set AS_WORK environment variable."
	exit 1
fi

# comfirm execute paramter 
if [ $# -eq 2 ];
then
	file=$1
	type=$2
else
	echo "usage: `basename $0` Makefile_list {hpuxcc|linuxgcc|ca|cproto|pt|clean}"
	exit 1
fi

if [ ! -r $file ];
then
	echo "Can not read Makefile list file.($file)"
	exit 1
fi

CC_PATH=${CC_PATH:="/usr/bin/cc"}
CC_LD_PATH=${CC_PATH:="/usr/bin/cc"}
GCC_PATH=${GCC_PATH:="/opt/hp-gcc/bin/gcc"}
GCC_LD_PATH=${GCC_PATH:="/opt/hp-gcc/bin/gcc"}
CADVICE_PATH="/opt/cadvise/bin/cadvise"
CPROTO=${CPROTO:="/usr/local/bin/cproto"}
CURRENT_DATE=`LANG=C date '+%Y-%m%d'`
CURRENT_TIME=`LANG=C date '+%m%d%H%M'`

log=$PJHOME/log/$APNAME/$type/$CURRENT_DATE/log$CURRENT_TIME
if [ "$type" = "hpuxcc" ] ; then
	# HP-UX C Compiler
	export CC="$CC_PATH"
	export LD="$CC_LD_PATH"

elif [ "$type" = "linuxgcc" ] ; then
	# GCC Warning check
	export CC="$GCC_PATH"
	export LD="$GCC_LD_PATH"

elif [ "$type" = "ca" ] ; then
	# Code Adviser
	PDB_DIR=$PJHOME/log/$APNAME/ca/$CURRENT_DATE/pdb
	mkdir -p $PDB_DIR
	echo "PDB_DIR : $PDB_DIR"
	export CC="$CADVICE_PATH -pdb $PDB_DIR +wall $CC_PATH"
	export LD="$CC_LD_PATH"

elif [ "$type" = "cproto" ] ; then
	# cproto
	FUNC_OUT=$PJHOME/work/pt/$APNAME/Func_input_tmp_c_$CURRENT_TIME.txt
	log=$PJHOME/work/pt/$APNAME/cproto_$CURRENT_TIME.log
	echo "cproto output file : $FUNC_OUT"
	echo "cproto error output file : $FUNC_ERR"

elif [ "$type" = "pt" ] ; then
	# Code Adviser(PT)
	PDB_DIR=$PJHOME/log/$APNAME/pt/$CURRENT_DATE/pdb
	mkdir -p $PDB_DIR
	echo "PDB_DIR : $PDB_DIR"
	export CC="$CADVICE_PATH -pdb $PDB_DIR +wall $CC_PATH +DD64 -D__HP_IGNORE__"
	export LD="$CC_LD_PATH"

elif [ "$type" = "clean" ] ; then
	log=/dev/tty

else
	echo "Invalid compile type($type)."
	echo "type:hpuxcc,linuxgcc,ca,cproto,pt,clean"
	exit 1
fi

if [ ! -e $log ] ; then
	mkdir -p `dirname $log`
fi

# set parameter to output warning messege in english
export LC_MESSAGES=C
export LC_CTYPE=C

echo "output logfile:$log"
echo "Starting Time : `LANG=C date '+%Y/%m/%d %H:%M:%S'`" >> $log
>> $log
for i in `cat $file`
do
	(
		cd $AS_WORK
		echo "========== $i"
		if [ ! -f $i ]; then
			echo "Not found $i"
			pwd
		else
			dir=`dirname $i`
			makefile=`basename $i`
			cd $dir
			if [ "$type" = "clean" ] ; then
				make -f $makefile clean
			elif [ "$type" = "cproto" ] ; then
				make -e -f $makefile cproto >> $FUNC_OUT 2>> $log
			else
				make -e -f $makefile all 2>&1
			fi
		fi
	) >>  $log
done
echo "Finished Time : `LANG=C date '+%Y/%m/%d %H:%M:%S'`" >> $log

