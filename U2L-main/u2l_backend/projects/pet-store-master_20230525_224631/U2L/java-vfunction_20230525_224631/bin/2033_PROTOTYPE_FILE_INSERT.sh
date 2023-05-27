#!/usr/local/bin/bash
#
# $Header: /data/cvsrepo/assess-tools/bin/2033_PROTOTYPE_FILE_INSERT.sh,v 1.6 2014/01/22 09:47:05 morimoto Exp $
# $Name: rev_1_10 $
#
# ツール名 : 2033_PROTOTYPE_FILE_INSERT.sh
# 概要     : プロトタイプ宣言挿入ツール
# 実行方法 : 2033_PROTOTYPE_FILE_INSERT.sh FILELST
# 入力	   : FILELST : 2032_CPROTO_CHANGER.sh 出力結果ファイル
# 出力     : なし(各ファイルにプロトタイプ宣言を追加)

INPUT_FILE=$1

while read DATA;do

 FILE_NAME=`echo "$DATA" | cut -d@ -f1`
 
echo $FILE_NAME | sed 's/\.c/\.pc/' | xargs ls > /dev/null 2>&1 

if [ $? -eq 0 ] ;then
 FILE_NAME=`echo $FILE_NAME | sed 's/\.c/\.pc/'`
fi

LAST_INCLUDE=` egrep -in "^exec[ |	]+sql[ |	]+include|#include" $FILE_NAME | tail -1 | cut -d: -f1 `

echo $FILE_NAME

PROTO_TYPE_INFO=`echo "$DATA" | cut -d@ -f2-`
OUTPUT_FILE="./insert_tmpdata"

if [ -z "$PROTO_TYPE_INFO" ] ; then
  continue
fi

# create line feed code
LF=$(printf '\\\012_')
LF=${LF%_}

if [ "$LAST_INCLUDE" = "" ] ;then
 echo "$PROTO_TYPE_INFO" | sed -e 's/; /;'"$LF"'/g' > $OUTPUT_FILE
 cat "$FILE_NAME" >> $OUTPUT_FILE

else 
 sed ${LAST_INCLUDE}q $FILE_NAME > $OUTPUT_FILE
 echo "$PROTO_TYPE_INFO" | sed -e 's/; /;'"$LF"'/g' >> $OUTPUT_FILE
 LAST_INCLUDE=`expr ${LAST_INCLUDE} + 1`
 tail -n +"$LAST_INCLUDE" $FILE_NAME >> $OUTPUT_FILE
fi

 cp $OUTPUT_FILE $FILE_NAME
 rm $OUTPUT_FILE


done < "$INPUT_FILE"

