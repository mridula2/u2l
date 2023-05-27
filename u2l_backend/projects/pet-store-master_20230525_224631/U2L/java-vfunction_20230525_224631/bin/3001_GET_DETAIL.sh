#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/3001_GET_DETAIL.sh,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 3001_GET_DETAIL.sh
# 概要     : ファイル名・行から対応するソースコードを組み込むツール
# 実行方法 : 3001_GET_DETAIL.sh INPUT_FILE OUTPUT_FILE
# 入力	   : INPUT_FILE : 警告メッセージ一覧
# 出力     : OUTPUT_FILE : ソースコード組み込み済みファイル

if [ $# -ne 2 ];then
    echo "Usage :GET_DETAIL.sh \$1 \$2"
    exit 1
fi

INPUT_FILE=$1
OUTPUT_FILE=$2
TMP_FILE=/var/tmp/tmp.$$
rm -f $OUTPUT_FILE

echo "START : InputFileName is $INPUT_FILE"

grep "^\"" $1 > $TMP_FILE

while read DATA;do

	FILE_PATH=`echo "$DATA" | cut -d, -f1 | cut -d\" -f2`
	TARGET_LINE=`echo "$DATA" | cut -d: -f1 | cut -d" " -f3 | cut -d, -f1`
	WNG_KIND=`echo "$DATA" | cut -d: -f2 | cut -d" " -f2`
	WNG_NUM=`echo "$DATA" | cut -d: -f2 | cut -d" " -f3`
	WNG_MES=`echo "$DATA" | cut -d: -f3- | sed 's/^ //g'`

	echo "$FILE_PATH\t$TARGET_LINE\t$WNG_KIND\t$WNG_NUM\t$WNG_MES\t\c" >> $OUTPUT_FILE
	sed -n "${TARGET_LINE}"p "$FILE_PATH" | tr -d '\012' | tr -d '\015' | tr '\11' '    ' >> $OUTPUT_FILE 
	echo "" >> $OUTPUT_FILE

done < $INPUT_FILE

rm -f $TMP_FILE

echo "END : OutputFileName is $OUTPUT_FILE"  
