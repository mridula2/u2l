#!/bin/sh
#
# Revision: rev_1_0
#
# Name : javaFrameworkScan.sh
# Description  : Scans all .java files for Struts and Spring Framework Usage(API/Methods/Class/Interface/Exception/Fields).
# Usage : javaFrameworkScan.sh SourceFolder FrameworkType(Spring/Struts)
# SourceFolder : WorkSpace where Java source files are present.
# FrameworkType : Either Struts or Spring
# Output: 1. List of Standard and Non Standard Libraries/Jar
#         2. List of Affected Files with line numbers and source code
#         3. Remedy Steps for Each Affected Line of Source Code
# Created by: Bhavna Harinkhede
# Date : 21/06/2018
#
if [ $# -ne 2 ];
        then
                echo "Usage : javaFrameworkScan.sh SourceFolder FrameworkType(Spring/Struts/Jsf)"
                echo "Usage Example: ./javaFrameworkScan.sh /home/bhavna/WorkSPace/work Spring"
                 exit
fi
sourceFolder="${1%/}"
scanType="$2"
echo
CommonRules="$PJHOME/JavaRules/JavaCommonRules"
if [ "$scanType" = "Spring" ]; then
   rulesPath="$PJHOME/JavaRules/SpringRules"
elif [ "$scanType" =  "Struts" ]; then
   rulesPath="$PJHOME/JavaRules/StrutsRules"
elif [ "$scanType" = "Jsf" ]; then
   rulesPath="$PJHOME/JavaRules/JsfRules"
else
   echo "Framework Type should be either Spring, Struts, or Jsf"
   exit
fi

if [ -f keywords2scan ];
	then 
		rm -rf keywords2scan
fi

if [ -f javalist.txt ];
	then 
		rm -rf javalist.txt
fi

if [ -f sourceScanImports.txt ];
	then 
		rm -rf sourceScanImports.txt
fi

if [ -f uniqSourceScanImports.txt ];
	then
		rm -rf uniqSourceScanImports.txt
fi

if [ -f uniqKeywords2scan ];
        then
                rm -rf uniqKeywords2scan
fi

if [ -f rulesGrepped.txt ];
        then
                rm -rf rulesGrepped.txt 
fi

if [ -f uniqRulesGrepped.txt ];
        then
                rm -rf uniqRulesGrepped.txt
fi

if [ -f sourceCode2Remedy ];
        then
                rm -rf sourceCode2Remedy 
fi
if [ -f sourceScanRemedy ];
        then
                rm -rf sourceScanRemedy
fi

if [ -f affectedSourceInformation ];
        then
                rm -rf affectedSourceInformation
fi


find $sourceFolder/ -name *.java >javalist.txt
for i in `cat javalist.txt`
 do 
   grep -inH "import" $i >> sourceScanImports.txt
done
cat sourceScanImports.txt | cut -d ' ' -f2 | cut  -d ';' -f1 | sed 's/[ ]//g'| sort | uniq >uniqSourceScanImports.txt


for i in `cat uniqSourceScanImports.txt `
do
Apiflag=0
if [ `grep $i $rulesPath/*.rules | wc -l` -gt 0 ];
        then
             grep $i $rulesPath/*.rules | cut -d ':' -f2 >> rulesGrepped.txt
             Apiflag=1
        else
             CheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
             k=0;
             while [ $k -lt $CheckRulestoCount ]
                  do
                    Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
                    if [ `grep $Apitocheck  $rulesPath/*.rules | wc -l` -gt 0 ];
                       then
                             grep  $Apitocheck $rulesPath/*.rules | cut -d ':' -f2 >> rulesGrepped.txt
                             Apiflag=1
                    fi
                      k=`expr $k + 1`
                   done
fi

done
cat rulesGrepped.txt | sort | uniq >>uniqRulesGrepped.txt

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for i in `cat uniqRulesGrepped.txt`
do 
	lib2Grep=`echo $i | cut -f3 | sed 's/[ ]//g'`;
        word2Grep=`echo $i | cut -f4 | cut -d '(' -f1 | sed 's/[ ]//g'`;
        rule2Grep=`echo $i | cut -f1 | sed 's/[ ]//g'`;
	for j in `cat javalist.txt`
	do 
		if [ `grep $lib2Grep $j | wc -l` -gt 0 ];
			then
				if [ `grep $word2Grep $j |grep -v "import" | grep -v "*" | grep -v "//" |  wc -l` -gt 0 ]; 
                                   then
					for k in `grep -inH $word2Grep $j | grep -v "import" | grep -v "*" | grep -v "//" `
				  	 do
	     			  		echo -e $rule2Grep '\t' $k >>sourceCode2Remedy
					done
				fi
		fi  
	done
done
for i in `cat sourceCode2Remedy`
do 
	ruleId=`echo $i | cut -f1`
        ruleId=`echo $ruleId | sed 's/[ ]//g'`
        fileName=`echo $i | cut -f2 | cut -d ':' -f1`
        lineNumber=`echo $i | cut -f2 | cut -d ':' -f2`
	affectedSource=`echo $i | cut -d ':' -f3`
        remedyStep=`grep $ruleId uniqRulesGrepped.txt | cut -f5`
echo -e $ruleId '\t' $fileName '\t' $lineNumber '\t' $remedyStep >> sourceScanRemedy 
echo -e $fileName '\t' $lineNumber '\t' $affectedSource >> affectedSourceInformation
done
        
IFS=$SAVEIFS

