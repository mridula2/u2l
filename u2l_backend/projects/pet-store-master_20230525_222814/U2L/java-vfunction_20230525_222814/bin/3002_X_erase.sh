#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/3002_X_erase.sh,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 3002_X_erase.sh
# 概要     : ×判定の警告メッセージを除外
# 実行方法 : 3002_X_erase.sh keyword_list_file input_file output_file
# 入力	   : keyword_list_file : 除外対象となる警告番号を記載したファイル
#          : input_file :    ログファイル
# 出力     : output_file :   除外されたログファイル

log=$PJHOME/log/work/DELETED/X_erase`LANG=C date '+%m%d%H%M'`.log
rm $log

if [ $# -ne 3 ];
then
	echo " Usage : X_erase.sh keyword_list_file input_file output_file"
	exit
else
	key_file=$1
	input_file=$2
	temp_file=X_erase.tmp
	temp_file2=X_erase2.tmp
	output_file=$3
fi

echo "Starting Time : \c" >> $log
date >> $log
for i in `cat $key_file`
do
	echo "$i : `grep "$i" $input_file | wc -l`" >>  $log
	grep -v "$i" $input_file > $temp_file

	cp $temp_file $temp_file2
	input_file=$temp_file2
done
cp $temp_file $output_file
rm $temp_file $temp_file2
echo "Finished Time : \c" >> $log
date >> $log

