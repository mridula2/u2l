#!/bin/sh
#
# Revision: rev_1_0
#
# Name : 0013_phpRemedyScan.sh
# Description  : Searches for all .phar files and extract them.
# Usage : 0013_phpRemedyScan.sh php_files.out logdir
# php_files.out : List of PHP source files present in the workspace.
# Log dir: Log folder wheere log files needs to be saved.`
# Output: 1. List of Affected Files with line numbers and source code
#         2. Remedy Steps for Each Affected Line of Source Code
# Created by: Kalin
# Date : 27/07/2018
#
if [ $# -ne 2 ];
then 
    echo "Usage : 0013_phpRemedyScan.sh php_files.out logdir"
    exit
fi
rulesPath="/usr/local/hpscan/phpanalyze/PHPRules/phpRules.rules"
SAVEIFS=$IFS
IFS=$(echo -en "\n")
while read i
do
        word2Grep=`echo $i | cut -f3 | cut -d '(' -f1 | sed 's/[ ]//g'`;
        rule2Grep=`echo $i | cut -f1 | sed 's/[ ]//g'`;
        while read j
        do
                if [ `grep $word2Grep $j |  wc -l` -gt 0 ];
                   then
                        grep -inH $word2Grep $j > tmpfile
                        while read k
                          do 
                             echo -e $rule2Grep '\t' $k >> $2/phpSourceCode2Remedy 
                          done < tmpfile
                fi
        done < $1
done < $rulesPath

while read i
do
        ruleId=`echo $i | cut -f1`
        ruleId=`echo $ruleId | sed 's/[ ]//g'`
        fileName=`echo $i | cut -f2 | cut -d ':' -f1`
        lineNumber=`echo $i | cut -f2 | cut -d ':' -f2`
        affectedSource=`echo $i | cut -d ':' -f3`
        remedyStep=`grep $ruleId $rulesPath | cut -f4`
echo -e $ruleId '\t' $fileName '\t' $lineNumber '\t' $remedyStep >> $2/phpSourceScanRemedy
echo -e $fileName '\t' $lineNumber '\t' $affectedSource >> $2/phpAffectedSourceInformation
done < $2/phpSourceCode2Remedy

IFS=$SAVEIFS

