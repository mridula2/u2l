#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/7000_endian_report.sh,v 1.4 2013/09/03 10:02:51 hmizuno Exp $
# $Name: rev_1_10 $
#
# Tool Name : 7000_endian_report.sh
# Summary: Extract source code including keyword on endian problem
# 実行方法 : 7000_endian_report.sh
# Input	   : file : Comment removed files
# Output: Standard output of execution result

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

$PJHOME/bin/6005_64bit-match-exclude.pl $file $PJHOME/etc/endian.match $PJHOME/etc/endian.exclude > endian_reportlog 2> excludes.log
