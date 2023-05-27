#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/3020_cw-change.sh,v 1.3 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 3020_cw-change.sh
# 概要     : HP-UX コンパイラメッセージフォーマット変換ツール
# 実行方法 : 3020_cw-change.sh log
# 入力	   : log : コンパイルログ
# 出力     : cw-HPUX.txt : フォーマット変換後コンパイルログ
#
log=./log-awk`LANG=C date '+%m%d%H%M'`

if [ $# -ne 1 ];
then
	echo "Usage: $0 <compile-log>"
	exit 1
fi

if [ -f $1 ];
then
	FILE=$1
else
	echo "Not found file.: $1"
	exit 1
fi

echo "Starting Time : `date`" >> $log
(
gawk 'BEGIN {FS=":" } \
{ \
  sub(/#G/, "#")
  if(NF==5) { printf("\"%s\", line %s: %s-D:%s\n",$1,$2,substr($3,2),$5) } \
  else      { printf("\"%s\", line %s: %s-D:%s\n",$1,$2,substr($3,2),$4) } \
}' $FILE  >> ./cw-HPUX.txt
   ) >>  $log
echo "Finished Time : `date`" >> $log
