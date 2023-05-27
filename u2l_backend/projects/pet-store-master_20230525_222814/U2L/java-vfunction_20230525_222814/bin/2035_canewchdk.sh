#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/2035_canewchdk.sh,v 1.2 2013/06/24 05:36:28 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 2035_canewchdk.sh
# 概要     : プロトタイプ宣言追加による新規警告検出ツール
# 実行方法 : 2035_canewchdk.sh CACL_log PT_CACL_log
# 入力	   : CACL_log : プロトタイプ追加前警告メッセージ一覧
#	     PT_CACL_log : プロトタイプ追加後警告メッセージ一覧
# 出力     : 追加前追加後の比較結果
#		remark #2172-D  0       2       2
#		remark #2177-D  47128   47128   0
#		remark #2181-D  3       3       0

if [ $# -ne 2 ];
then
	echo "Usage : $0 CACL_log PT_CACL_log"
	exit 1
fi

if [ -f $1 ];
then
	CACL=$1
else
	echo "Not found $1"
	exit 1
fi

if [ -f $2 ];
then
	PT_CACL=$2
else
	echo "Not found $2"
	exit 1
fi

cut -d: -f2 $PT_CACL | sort | uniq | while read LINE;
do
	CANUM=`grep "$LINE" $CACL | wc -l`
	PTCANUM=`grep "$LINE" $PT_CACL | wc -l`
	DIFF=`expr $PTCANUM - $CANUM`
	echo "$LINE\t$CANUM\t$PTCANUM\t$DIFF"
done
