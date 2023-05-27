#!/usr/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/2030_getprotow.sh,v 1.2 2013/06/24 05:36:28 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 2030_getprotow.sh
# 概要     : プロトタイプに関する警告(#2223,#4241,#4242,#4243)メッセージ抽出ツール
# 実行方法 : 2030_getprotow.sh log output
# 入力	   : log    : Code Advisor ログファイル
# 出力     : output :  プロトタイプに関する警告メッセージ

trap 'rm -f output_*.$$ ;exit 1' 2 3 9 15

if [ $# -ne 2 ];
then
	echo "Usage : $0 <CA_LOG_FILE> <OUTPUT_FILE>"
	exit 1
fi

if [ -f $1 ];
then
	FILE=$1
	OUTPUT=$2
else
	echo "Not found $1"
	exit 1
fi

grep '#2223-D' $FILE  | sed 's/^\"\(.*\)\",.*function \"\(.*\)\" declared implicitly/\1	\2/' > output_2223.$$

grep '#4241-D' $FILE  | sed 's/^\"\([^,][^,]*\)\",.*redeclaration, function \"\(.*\)\".*/\1	\2/' > output_4241.$$

grep '#4242-D' $FILE  | sed 's/^\"\(.*\)\",.*for call to \"\(.*\)\"/\1	\2/' > output_4242.$$

$PJHOME/bin/2031_prt4243.pl $FILE > output_4243.$$

cat output_2223.$$ output_4241.$$ output_4242.$$ output_4243.$$ > $OUTPUT

rm -f output_2223.$$ output_4241.$$ output_4242.$$ output_4243.$$

