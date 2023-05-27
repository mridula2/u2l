#!/usr/bin/csh
#
# $Header: /data/cvsrepo/assess-tools/bin/0002_cobstep.csh,v 1.2 2013/06/24 05:36:27 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 0002_cobstep.csh
# 概要     : COBOLの行数計算ツール
# 実行方法 : 0002_cobstep.csh 
# 入力	   : なし
# 出力     : cobstep.csv : COBOLのファイル名、行数の CSVファイル


# ヘッダの出力
echo "FileName,DefLine,DefComment,ProcLine,ProcComment" > cobstep.csv

# カウントの開始
find . -name "*.pco" -exec perl cobstep.pl {} \;  >>  cobstep.csv
find . -name "*.cbl" -exec perl cobstep.pl {} \;  >>  cobstep.csv
find . -name "*.cob" -exec perl cobstep.pl {} \;  >>  cobstep.csv
