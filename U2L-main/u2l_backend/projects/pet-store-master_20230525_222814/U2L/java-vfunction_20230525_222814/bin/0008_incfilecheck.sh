#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/0008_incfilecheck.sh,v 1.4 2013/06/27 05:34:56 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 0008_incfilecheck.sh
# 概要     : .c/.pc 中に指定されたインクルードファイルがあることを確認する
# 実行方法 : 0008_srccheck C_filelist
# 入力	   : C_filelist     : .c/.pc ファイルリスト
# 出力     : インクルードが存在しない時に、ファイル名と結果を出力
#              FILE abc.h
#              ./src/xxx.c:10:#include "sample.h"

#LOGDIR="$PJHOME/log/$APNAME/srccheck"
LOGDIR="$PJHOME/log/$APNAME"
INCFILE="inclist.$$"
trap 'rm -f $INCFILE;exit 1' 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15

# ログファイル保存ディレクトリのチェック
if [ -d $LOGDIR ];
then
	#we are Replacing .out to .log As when we re-run its picking these .out file also it should pick only C/C++/make.out file#
	#logfile="$LOGDIR/`date +%Y-%m%d`/incfilecheck_`date +%Y-%m%d-%H%M`.out"  
#	logfile="$LOGDIR/`date +%Y-%m%d`/incfilecheck_`date +%Y-%m%d-%H%M`.log"
	logfile="$LOGDIR/incfilecheck_`date +%Y-%m%d-%H%M`.log"
else
	echo "Not found $LOGDIR"
	exit 1
fi

if [ $# -ne 1 ];
then
	echo "Usage : $0 C_filelist"
	exit 1
fi

if [ -f $1 ];
then
	DEST=$1
else
	echo "Not found $1"
	exit 1
fi
	
cat $DEST | xargs grep -n '#include' > $INCFILE

while read a; 
do
	hfile=`echo $a | cut -d: -f3 | sed -e 's/.*\#include[ 	]*"//' \
           -e 's/.*\#include[ 	]*<//' -e 's/".*//' -e 's/>.*//g'`
	find /usr/include | grep -q "$hfile"
	if [ $? -ne 0 ];
	then
		grep -q "$hfile" $DEST
		if [ $? -ne 0 ];
		then
			echo "FILE $hfile" | tee -a $logfile
			echo "$a" | tee -a $logfile
		fi
	fi
done < $INCFILE

# $logfile がない場合には、問題がないことを出力する
if [ -f $logfile ];
then
        echo "log filename : $logfile"
else
        echo "All files are exist."
fi

rm -f $INCFILE
