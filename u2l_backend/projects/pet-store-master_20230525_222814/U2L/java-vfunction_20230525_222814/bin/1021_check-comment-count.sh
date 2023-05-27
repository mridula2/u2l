#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1021_check-comment-count.sh,v 1.3 2014/11/14 05:13:56 meguro Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1021_check-comment-count.sh
# 概要     : コメントの種類数カウントツール
# 実行方法 : usage 参照
# 出力     : コメントの種類ごとの数を以下の形式でstdout出力
#             10 ME-01
#              5 ME-02

usage()
{
cat <<EOF
usage :
   $ find /path -name Makefile\* | check-comment-count.sh

comment pattern:

### HP_MOD : ME-01 : 2012.05.16 : begin
/* HP_MOD : CE-01 : 2012.05.16 : begin */

EOF
}

xargs grep 'HP_MOD' \
	|while read line
	do
		if echo "$line" \
			|cut -d: -f2- \
			|grep -e '^### HP_MOD : [A-Z][A-Z]-[0-9][0-9] : [0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9] : begin' \
	         		-e '\/\* HP_MOD : [A-Z][A-Z]-[0-9][0-9] : [0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9] : begin \*\/' >/dev/null; then
		echo "$line" |sed 's/.*HP_MOD : \([A-Z][A-Z]-[0-9][0-9]\) : .*/\1/'; fi
	done |sort |uniq -c

