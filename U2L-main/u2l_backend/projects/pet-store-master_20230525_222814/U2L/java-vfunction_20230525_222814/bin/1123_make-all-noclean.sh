#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1123_make-all-noclean.sh,v 1.2 2014/08/01 07:58:20 hmizuno Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1022_make-all.sh
# 概要     : MakefileリストにあるMakefileを順にコンパイルを行う
# 実行方法 : 1022_make-all.sh Makefile_list
# 入力	   : Makefile_list : Makefileリスト
# 出力     : 
#
#export CC="/opt/hp-gcc/bin/gcc -Wall -mlp64"
#export LD="/opt/hp-gcc/bin/gcc -mlp64"

#export CC="/usr/bin/cc +DD64 +w"
#export CC="/usr/bin/cc +DD64 -D__HP_IGNORE__"
#export CC="/usr/bin/cc +DD64 -D__HP_IGNORE__ +w"
export CC="/opt/cadvise/bin/cadvise -pdb $PJHOME/log/aix01/ca/2013-0730-1630/pdb +wall cc +DD64 +w -D__HP_IGNORE__"
export LD="/usr/bin/cc +DD64"
#export CC="cproto -I /opt/oracle/product/11.2.0/dbhome-1/precomp/public/ "

export OWNER=kitayama
export PROC=proc
export PROCFLAGS='sqlcheck=syntax DEFINE=__HP_IGNORE__ code=ANSI_C lines=YES  ireclen=1024 oreclen=1024 release_cursor=yes lreclen=512  maxopencursors=20'

# ビルドを実行するディレクトリを指定しているか確認
if [ "`echo $AS_WORK`" = "" ];
then
	echo "Not set AS_WORK environment variable."
	exit 1
fi

log=$PJHOME/log/$APNAME/hpuxcc/log`LANG=C date '+%m%d%H%M'`

if [ $# -ne 1 ];
then
        # default makefile list
        file=$PJHOME/etc/make_files.out

else
        file=$1
fi

echo "Starting Time : \c" >> $log
date >> $log
for i in `cat $file`
do
   (
            cd $AS_WORK
            echo "========== $i"
            if [ ! -f $i ];
            then
                echo "Not found $i"
                echo "DEST $dest"
                pwd
            else
               dir=`dirname $i`
               makefile=`basename $i`
               cd $dir
               make -e -f $makefile all 2>&1
            fi
   ) >>  $log
done
echo -n "Finished Time : " >> $log
date >> $log

