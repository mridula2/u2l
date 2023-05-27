#!/usr/local/bin/bash
#
# $Header: /data/cvsrepo/assess-tools/bin/3000_FULLPATH.sh,v 1.4 2013/07/10 10:51:40 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 3000_FULLPATH.sh
# 概要     : フルパス化ツール
# 実行方法 : 3000_FULLPATH.sh log_file output_file
# 入力	   : log_file : ログファイル
#          : output_file : フルパス化完了ファイル
# 出力     : output_file : フルパス化完了ファイル

export PATH=$PATH:/usr/local/bin

# HPUXの実行結果の場合: 1, Linuxの実行結果の場合は 0 を設定
HPUX=0

# locatedb の保存先
LOCATEDB="$PJHOME/etc/src.db"

if [ $# -ne 3 ];
then
	echo "Usage : $0 <log_file> <output_file> <search_dir>"
	exit 1
fi

if [ -f $1 ];
then
	INPUT_FILE=$1
else
	echo "Not found input file : $1"
	exit 1
fi
	
if [ -f $2 ];
then
	echo "Output file exists : $2"
	exit 1
else
	OUTPUT_FILE=$2
fi

if [ -d $3 ];
then
	SEARCH_DIR=$3
else
	echo "Not found search dir : $3"
	exit 1
fi

if [ ! -d $LOCATEDB ];
then
	updatedb -l 0 -o $LOCATEDB -U $SEARCH_DIR
fi

TOTAL=`wc -l $INPUT_FILE`

sed 's/\\/\\\\/g' $INPUT_FILE | 
while read DATA;do

 FILE_NAME=`echo $DATA | cut -d\" -f2`

 #toArray
 if [ $HPUX -eq 1 ] && [ `echo $FILE_NAME | grep "/"` ] ; then
  echo $DATA >> $OUTPUT_FILE

 else
  FILE_NAME=`basename $FILE_NAME`
  echo $FILE_NAME
  Find_Array=(`locate -d $LOCATEDB "/$FILE_NAME"`)

  #Check arrangement
  for i in ${Find_Array[@]}; do
   if [ 2 -le  ${#Find_Array[@]} ] ; then
    echo "\"[DUP]"  | tr -d '\012' | tr -d '\015' >> $OUTPUT_FILE
   else
    echo "\""  | tr -d '\012' | tr -d '\015' >> $OUTPUT_FILE
   fi
   echo "$i\","`echo $DATA | cut -d, -f2-` >> $OUTPUT_FILE
  done

 fi
done

#echo "END"


