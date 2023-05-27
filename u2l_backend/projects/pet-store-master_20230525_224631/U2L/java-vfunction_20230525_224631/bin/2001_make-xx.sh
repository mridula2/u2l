#!/bin/sh
#
#  FAIMS/IT for makefile.lst
#CC="gcc -Wall" 

export CC LINKER HOP_APL HOP_BAS

# Compile Log filename
log=$PJHOME/logs/compile/log`LANG=C date '+%m%d%H%M'`

if [ $# -ne 1 ];
then
	# default makefile list
	file=$PJHOME/logs/filelists/make_files_target.out

else
	file=$1
fi

cd $HOP_BAS
echo "Starting Time : \c" >> $log
date >> $log
for i in `cat $file`
do
    mfile=`basename $i | sed 's/^/..\/mak\//'`
    dest=`dirname $i | sed 's/mak/src/'`
   (
	    cd $dest
	    echo "========== $i"
	    if [ ! -f $mfile ];
	    then
		echo "Not found $mfile"
		echo "DEST $dest"
                pwd
	    else
	       make -f $mfile clean
	       make -e -f $mfile all 2>&1
	    fi
   ) | tee -a $log
done
echo -n "Finished Time : " >> $log
date >> $log



