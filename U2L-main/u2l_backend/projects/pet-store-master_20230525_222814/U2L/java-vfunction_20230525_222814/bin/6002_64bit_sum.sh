#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/6002_64bit_sum.sh,v 1.3 2015/01/29 05:12:35 meguro Exp $
# $Name: rev_1_10 $
#
# ツール名 : 6002_64bit_sum.sh
# 概要     : キーワードごとに分別、集計
# 実行方法 : 6002_64bit_sum.sh
# 入力	   : file : 6001_64bit_report_omit.sh結果
# 出力     : {file}_bit : 分類した結果
#
#	2012/06/11 grep→perlスクリプトへ変更
log=$PJHOME/SAGYOU/LOG/64bit_reportlog`LANG=C date '+%m%d%H%M'`

if [ $# -ne 1 ];
then
	echo "Usage : $0 <file>"
	exit 1
fi

if [ -f $1 ];
then
	file=$1
else
	echo "Not found $1"
	exit 1
fi

grep -we '<<' -we '>>' -we '&' -we '|' -we '~' -we '\^'  $file > ${file}_bit
grep -we '(int)' -we 'int(' $file > ${file}_int
grep -we '0xffffffff' -we '0x7fffffff' -we '4' -we '32' $file > ${file}_longpo
grep -we 'unsigned int' -we 'unsigned long' $file > ${file}_huge 
grep -e '%[+-\#]\?[0-9]*x' $file > ${file}_x
