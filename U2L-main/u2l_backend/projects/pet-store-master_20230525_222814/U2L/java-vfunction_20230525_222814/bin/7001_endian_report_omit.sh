#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/7001_endian_report_omit.sh,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# Tool Name : 7001_endian_report_omit.sh
# Overview     : 7000_endian_report.sh Delete source code including negative keywords from results
# Execution method  : 7001_endian_report_omit.sh file
# Input     : file : 7000_endidan_report.sh結果
# Output     : file_omit : Execution Result
log=$PJHOME/SAGYOU/LOG/endian_report_omitlog`LANG=C date '+%m%d%H%M'`

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

#grep -ve "#include" -ve "&&" -ve "<<<" -ve ">>>" -ve "||" -ve "<<.*>>" -ve "&(" -ve "2.2." -ve "4.4." ${full_filename1} > ${full_filename1}_omit

cat ${full_filename1} | $PJHOME/bin/exclude.pl $PJHOME/etc/endian.exclude > ${full_filename1}_omit
