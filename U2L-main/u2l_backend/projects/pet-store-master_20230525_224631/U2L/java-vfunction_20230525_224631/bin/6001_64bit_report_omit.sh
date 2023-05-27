#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/6001_64bit_report_omit.sh,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 6001_64bit_report_omit.sh
# 概要     : 6000_64bit_report.sh結果から除外キーワードを含むソースコードを削除
# 実行方法 : 6001_64bit_report_omit.sh file
# 入力	   : file : 6000_64bit_report.sh結果
# 出力     : file_omit : 実行結果
#	2012/06/11 grep→>perlへ変更
#
#log=$PJHOME/SAGYOU/LOG/64bit_report_omitlog`LANG=C date '+%m%d%H%M'`

if [ $# -ne 1 ];
then
	echo "Usage : $0 <file>"
	exit 1
fi

if [ -f $1 ];
then
	full_filename1=$1
	out_filename1=${full_filename1}_omit
else
	echo "Not found $1"
	exit 1
fi

#grep -ve '#include' -ve '&&' -vwe 'char' -ve '<<<' -ve '>>>' -ve '||' -ve "<<.*>>" -ve "&(" -ve "2.2." -ve "4.4." ${full_filename1} > ${full_filename1}_omit

cat $full_filename1 | $PJHOME/bin/exclude.pl $PJHOME/etc/64bit.exclude > ${full_filename1}_omit
