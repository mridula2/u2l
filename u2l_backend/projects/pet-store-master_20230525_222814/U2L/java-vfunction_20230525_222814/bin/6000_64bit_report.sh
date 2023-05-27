#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/6000_64bit_report.sh,v 1.3 2013/07/08 09:36:06 miya Exp $
# $Name: rev_1_10 $
#
# Tool Name: 6000_64bit_report.sh
# Summary: Extract source code including keywords related to 64 bit problem
# Execution method : 6000_64bit_report.sh file
# 入力	   : file : Comment removed files
# Output   : Standard output of execution result
#	2012/06/11 grep→perlスクリプトへ変更
#

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

$PJHOME/bin/6005_64bit-match-exclude.pl $file $PJHOME/etc/64bit.match $PJHOME/etc/64bit.exclude > 64bit_reportlog 2> excludes.log
