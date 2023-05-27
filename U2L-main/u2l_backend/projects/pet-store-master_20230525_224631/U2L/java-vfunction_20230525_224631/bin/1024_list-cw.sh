#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1024_list-cw.sh,v 1.4 2013/06/27 09:09:16 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1024_list-cw.sh
# 概要     : gccコンパイル警告集計スクリプト
# 実行方法 : 1024_list-cw.sh log
# 入力	   : log : コンパイルログファイル
# 出力     : xxxx-cw-uniqc : 警告数とメッセージを以下の形式で出力
#            2822  warning #G2009: "/*" within comment
#              97  warning #G2068: pointer targets in passing argument....
#               4  warning #G2117: 'return' with no value, in function ......

#KEYWORD="警告:"
KEYWORD="warning:"
REPSCRIPT="$PJHOME/bin/1025_list-cw-rep.pl"

echo "START: "`date`

echo "コンパイルログファイルから \'${KEYWORD}\' を含むメッセージ別の件数集計"

#引数チェック: $1=入力ファイル(コンパイルログファイル)
iFile=$1

if [ -z $iFile ];
then
  echo "入力ファイルがありません！";
  echo "引数にコンパイルログファイルを指定してください。";
  exit 1;
fi

#ファイル存在チェック
if [ ! -e $iFile ];
then
  echo "指定されたファイルが存在しません: '$iFile'";
  exit 1;
fi
file=`basename $iFile`
dire=`dirname $iFile`
echo "指定ファイル：'$iFile'";
echo "  Path: $dire";
echo "  File: $file";
#ファイル処理
file1="${file}-cw-lines";
#(1) Grep $KEYWORD
echo "Step1.<<GREP>> "`date`;
#grep ${KEYWORD} ${iFile} > $file1;
$REPSCRIPT ${iFile} | sort -u > $file1;
size=`wc -c < $file1`;
if [ $size -eq 0 ];
then
  echo "キーワード：${KEYWORD}がありません。";
  exit 1;
fi
file2="${file}-cw-messages";
#(2) CUT - デリミタ:で区切られた3番目〜5番目を抽出する。
echo "Step2.<<CUT>> "`date`;
cut -d : -f 3,4,5 $file1 > $file2;
size=`wc -c < $file2`;
if [ $size -eq 0 ];
then
  echo "抽出データがありません。";
  exit 1;
fi
file3="${file}-cw-sort"
#(3) SORT - 行データの並び替え
echo "Step3.<<SORT>> "`date`
sort -bf -o $file3 $file2;
size=`wc -c < $file3`;
if [ $size -eq 0 ];
then
  echo "並び替えデータがありません。";
  exit 1;
fi
file4="${file}-cw-uniqc"
#(4) Uniq - 重複行のカウントとその削除
echo "Step4.<<UNIQ>> "`date`
uniq -c $file3 > $file4;
echo "集計ファイル⇒ $file4"
#(5) Rm - 中間ファイルの削除
#rm -f $file1 $file2 $file3;

echo "END:   "`date`;

exit 0;
