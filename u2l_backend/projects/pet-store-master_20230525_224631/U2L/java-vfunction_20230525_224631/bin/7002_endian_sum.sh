#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/7002_endian_sum.sh,v 1.3 2013/07/23 12:55:21 miya Exp $
# $Name: rev_1_10 $
#
# Tool name : 7002_endian_sum.sh
# Overview     : Separate and aggregate by keyword
# Execution method : 7002_endian_sum.sh
# Input     : file : 7000_endian_report.sh result
# Output     : {file}_bit : Classified reult


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

grep -we '<<' -we '>>' -we '&' -we '|' -we '~' -we '\^'  $file > ${file}_bit
grep -we 'union' $file > ${file}_union
grep -we 'socket' -we 'accept' -we 'bind' -we 'connect' -we 'fcntl' -we 'getpeername' -we 'getsockname' -we 'getsockopt' -we 'ioctl' -we 'recv' -we 'select' -we 'send' -we 'getprotoent' $file > ${file}_net
grep -we 'open' -we 'read' -we 'write' -we 'fopen' -we 'fread' -we 'fwrite' $file > ${file}_file
