#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1031_filecheck.sh,v 1.4 2013/06/27 09:31:22 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1031_filecheck.sh
# 概要     : 1030_tgt-gmake で生成されるファイルにリストされたファイルが
#            存在するか確認するツール
# 実行方法 : 1031_filecheck.sh file_list [build_list]
# 入力	   : file_list : $PJHOME/log/$APNAME/build/file_list-YYYYMMDD-HHMM.log
#	     build_list: $PJHOME/log/$APNAME/build/build_list-YYYYMMDD-HHMM.log
# 出力     : 
#
# Alreday checked file
confirmed_file="$PJHOME/log/$APNAME/build/confirm"

# C++ suffix
cxx_suffix="cc"

# check items
check_pc=0		# .pc -> .c/.cpp  (proc)
check_cpp=0		# .cpp -> .o  (c++)
check_c=0               # .c  -> .o  
check_cc=0              # .mak -> .c  (rare case)
check_makefile=0        # .mak -> .o  (rare case)
check_exe=0

# debug
debug=0

# suffix を変更して、ファイルが存在するか確認
file_exists() {
	fname=$1
	suffix=$2
	# From .o 
	fname=`echo $fname | sed "s/\.o/\.$suffix/"`
	# From .pc 
	fname=`echo $fname | sed "s/\.pc/\.$suffix/"`
	# From .c 
	fname=`echo $fname | sed "s/\.c$/\.$suffix/"`
	# From .cc ($cxx_suffix)
	fname=`echo $fname | sed "s/\.$cxx_suffix/\.$suffix/"`
	if [ $debug -ne 0 ];
	then
		echo "FILE $fname"
	fi
	if [ "`dirname $fname`" != "." ]
	then
		if [ -f $fname ];
		then
			return 1
		fi
	else
		found=`find . -name $fname`
		if [ "$found" != "" ];
		then
			return 1
		fi
	fi

	return 0;
}

#
# Main
#
if [ $# -lt 1 ] || [ $# -gt 2 ];
then
	echo "Usage : $0 file_list [build_list]"
	exit 1
fi

if [ $debug -ne 0 ];
then
	echo "Debug on..."
fi

if [ ! -f $1 ];
then
	echo "Not found $1"
	exit 1
else
	listfile=$1
fi

if [ $# -eq 2 ];
then
	if [ ! -f $2 ];
	then
		echo "Not found $2"
		exit 1
	else
		buildfile=$2
	fi
fi

if [ ! -f $confirmed_file ];
then
	touch $confirmed_file
fi

echo "Checking the files written in Makefile."
for i in `cat $listfile`
do
	file=$i
	if [ -f "$buildfile" ];
	then
		file=`basename $i` 
	fi
	file=`echo $file | sed 's/\$(\(.*\))/\$\1/'`
	file_exists $file $cxx_suffix
	if [ $? -eq 0 ];
	then
		file_exists $file c
		if [ $? -eq 0 ];
		then
			file_exists $file pc
			if [ $? -eq 0 ];
			then
				echo $file
			fi
		fi
	fi
done

if [ ! -f "$buildfile" ];
then
	echo "Checking .c/.pc/.cc under `pwd`"
	for i in `find . -type f -name '*.c' -o -name '*.pc' -o -name "*.$cxx_suffix"`
	do
		if [ $debug -ne 0 ];
		then
			echo "FILE $i"
		fi
		tgt=`basename $i | sed 's/\..*//'`
		grep -q "$tgt\." $listfile
		if [ $? -ne 0 ];
		then
			grep -q "$tgt" $confirmed_file
			if [ $? -ne 0 ];
			then
				echo $i
			fi
		fi
	done
	exit 0
fi

# .pc ファイルに対し .c ファイルが生成されているか確認
if [ $check_pc -eq 1 ];
then
	echo "Checking .pc -> .c/.cpp under `pwd`"
	for i in `find . -name \*.pc`
	do
		file_exists $i c
		if [ $? -eq 0 ];
		then
			file_exists $i $cxx_suffix
			if [ $? -eq 0 ];
			then
				grep -q "$i" $confirmed_file
				if [ $? -ne 0 ];
				then
					echo $i
				fi
			fi
		elif [ $debug -ne 0 ];
		then
			echo "Found $i"
		fi
	done
fi

# .cc ファイルに対し .o ファイルが生成されているか確認
if [ $check_cpp -eq 1 ];
then
	echo "Checking .$cxx_suffix -> .o under `pwd`"
	for i in `find . -name \*.$cxx_suffix`
	do
		file_exists $i o
		if [ $? -eq 0 ];
		then
			grep -q "$i" $confirmed_file
			if [ $? -ne 0 ];
			then
				ofile=`echo $i | sed 's/src/obj/'`
				file_exists $ofile o
				if [ $? -eq 0 ];
				then
					echo $i
				fi
			fi
		fi
	done
fi

# .c ファイルに対し .o ファイルが生成されているか確認
if [ $check_c -eq 1 ];
then
	echo "Checking .c -> .o under `pwd`"
	for i in `find . -name \*.[Cc]`
	do
		file_exists $i o
		if [ $? -eq 0 ];
		then
			grep -q "$i" $confirmed_file
			if [ $? -ne 0 ];
			then
				ofile=`echo $i | sed 's/src/obj/'`
				file_exists $ofile o
				if [ $? -eq 0 ];
				then
					echo $i
				fi
			fi
		fi
	done
fi

# Makefile で生成されるべきバイナリファイルがあるか確認
if [ -f "$buildfile" ];
then
	echo "Checking executable/library files..."
	for i in `cat $buildfile | cut -d'	' -f2`
	do
		ffile=`echo $i | sed 's/\$(\(.*\))/\$\1/'`
		nfile=`basename $ffile`
		a=`find . -name $nfile -type f -exec file {} \;`
		if [ "$a" = "" ] || [ "`echo $a | grep -e archive -e executable -e shared`" = "" ];
		then
			echo $i
		fi
	done
fi
