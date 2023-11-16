SAVEIFS=$IFS
IFS=$(echo -en "\n")
while read i
do
        lib2Grep=`echo $i | cut -f3 |cut -d '(' -f1 |  sed 's/[ ]//g'`;
        word2Grep=`echo $i | cut -f4 | cut -d '(' -f1 | sed 's/[ ]//g'`;
        rule2Grep=`echo $i | cut -f1 | sed 's/[ ]//g'`;
        while read j
        do
                if [ `grep $lib2Grep $j | wc -l` -gt 0 ];
                        then
                                if [ `grep $word2Grep $j |grep -v "import" | grep -v "*" | grep -v "//" |  wc -l` -gt 0 ];
                                   then
                                       while read k
                                         do
                                                echo -e $rule2Grep '\t' $k >>javaSourceCode2Remedy
				         done < <(grep -inH $word2Grep $j | grep -v "import" | grep -v "*" | grep -v "//")
                                fi
                fi
        done < javaRuleslist.txt
done < javaUniqRulesGrepped.txt

while read i
do
        ruleId=`echo $i | cut -f1`
        ruleId=`echo $ruleId | sed 's/[ ]//g'`
        fileName=`echo $i | cut -f2 | cut -d ':' -f1`
        lineNumber=`echo $i | cut -f2 | cut -d ':' -f2`
        affectedSource=`echo $i | cut -d ':' -f3`
        remedyStep=`grep $ruleId javaUniqRulesGrepped.txt | cut -f5`
echo -e $ruleId '\t' $fileName '\t' $lineNumber '\t' $remedyStep >> javaSourceScanRemedy
echo -e $fileName '\t' $lineNumber '\t' $affectedSource >> javaAffectedSourceInformation
done < javaSourceCode2Remedy

IFS=$SAVEIFS

