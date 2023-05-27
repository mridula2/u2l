#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1020_check-comment.sh,v 1.4 2014/05/28 02:34:34 morimoto Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1020_check-comment.sh
# 概要     : コメントのフォーマット確認ツール
# 実行方法 : usage 参照
# 出力     : 問題があるコメント行について "ERROR:bad pattern: ..." と表示

usage()
{
cat <<EOF
usage :
   $ find /path -name Makefile\* | check-comment.sh
   $ find . -name Makefile\* | check-comment.sh
   $ find . -name Makefile\* -o -name \*.mk | check-comment.sh

comment pattern:

### HP_MOD : ME-01 : 2012.05.16 : begin
### HP_MOD : ME-01 : 2012.05.16 : end
/* HP_MOD : CE-01 : 2012.05.16 : begin */
/* HP_MOD : CE-01 : 2012.05.16 : end */

EOF
}

xargs grep 'HP[-_]MOD' \
	|while read line
	do
		if echo "$line" \
			|cut -d: -f2- \
			|egrep -v -e '^### HP_MOD : [A-Z][A-Z]-[0-9]{2,3} : [0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9] : (begin|end)' \
	         		-e '\/\* HP_MOD : [A-Z][A-Z]-[0-9]{2,3} : [0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9] : (begin|end) \*\/' >/dev/null; then
		echo "ERROR:bad pattern: $line"; fi
	done

