#!/bin/sh
#
# Revision: rev_1_0
#
# Name : javaFrameworkScan.sh
# Description  : Scans all .java files for JDK,Servlets,JSP Usage(API/Methods/Class/Interface/Exception/Fields).
# Usage : javaFrameworkScan.sh SourceFolder
# SourceFolder : WorkSpace where Java source files are present.
# FrameworkType : Either Struts or Spring
# Output: 1. List of Standard and Non Standard Libraries/Jar
#         2. List of Affected Files with line numbers and source code
#         3. Remedy Steps for Each Affected Line of Source Code
# Created by: Bhavna Harinkhede
# Date : 19/07/2018
#
if [ $# -ne 1 ];
        then
                echo "Usage : javaRulesScan.sh SourceFolder"
                echo " Usage Example: ./javaFrameworkScan.sh /home/bhavna/WorkSPace/work"
                 exit
fi
sourceFolder="${1%/}"
rulesPath="$PJHOME/JavaRules/JavaCommonRules"
if [ -f javaKeywords2scan ];
	then 
		rm -rf javaKeywords2scan
fi

if [ -f javaRuleslist.txt ];
	then 
		rm -rf javaRuleslist.txt
fi

if [ -f javaSourceScanImports.txt ];
	then 
		rm -rf javaSourceScanImports.txt
fi

if [ -f javaUniqSourceScanImports.txt ];
	then
		rm -rf javaUniqSourceScanImports.txt
fi

if [ -f javaUniqKeywords2scan ];
        then
                rm -rf javaUniqKeywords2scan
fi

if [ -f javaRulesGrepped.txt ];
        then
                rm -rf javaRulesGrepped.txt 
fi

if [ -f javaUniqRulesGrepped.txt ];
        then
                rm -rf javaUniqRulesGrepped.txt
fi

if [ -f javaSourceCode2Remedy ];
        then
                rm -rf javaSourceCode2Remedy 
fi
if [ -f javaSourceScanRemedy ];
        then
                rm -rf javaSourceScanRemedy
fi

if [ -f javaAffectedSourceInformation ];
        then
                rm -rf javaAffectedSourceInformation
fi


find $sourceFolder/ -name *.java >javaRuleslist.txt
while read i  
 do 
   grep -inH "import" $i >> javaSourceScanImports.txt
done < javaRuleslist.txt
cat javaSourceScanImports.txt | cut -d ' ' -f2 | cut  -d ';' -f1 | sed 's/[ ]//g'| sort | uniq >javaUniqSourceScanImports.txt


while read i
do
if [ `grep $i $rulesPath/*.rules | wc -l` -gt 0 ];
	then
		grep $i $rulesPath/*.rules | cut -d ':' -f2 >> javaRulesGrepped.txt
	else 
             CheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
             k=0;
             while [ $k -lt $CheckRulestoCount ]
                  do
                    Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
                    if [ `grep $Apitocheck  $rulesPath/*.rules | wc -l` -gt 0 ];
                       then
                             grep  $Apitocheck $rulesPath/*.rules | cut -d ':' -f2 >> javaRulesGrepped.txt
                             Apiflag=1
                             break
                    fi
                      k=`expr $k + 1`
                   done
fi

done < javaUniqSourceScanImports.txt
cat javaRulesGrepped.txt | sort | uniq >>javaUniqRulesGrepped.txt

