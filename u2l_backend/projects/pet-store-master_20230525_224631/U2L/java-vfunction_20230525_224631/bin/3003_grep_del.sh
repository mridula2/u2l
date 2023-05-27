#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/3003_grep_del.sh,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 3003_grep_del.sh
# 概要     : 警告番号とキーワードにより警告メッセージを除外
# 実行方法 : 3003_grep_del.sh warnnum keyword log
# 入力	   : warnnum : 警告番号
#          : keyword : キーワード
#          : log     : 3002_X_erase.sh 処理後のログファイル
# 出力     : log_rslt というファイルが出力される

if [ $# -ne 3 ];then
    echo "Usage :tri_grep_del.sh \"<warningID>\" \"<word>\" <readfaile>"
    exit 1
fi

INPUT_FILE=${3}
OUTPUT_FILE=${3}_rslt
TMP_FILE=$PJHOME/log/work/DELETED/${1}_${2}_del.tmp
EXC_FILE=$PJHOME/log/work/DELETED/${1}_${2}_Exc.log

echo "START : InputFileName is ${INPUT_FILE}"

#