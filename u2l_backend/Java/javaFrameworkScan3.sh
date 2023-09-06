#!/bin/sh
#
# Revision: rev_1_0
#
# Name: javaFrameworkScan.sh
# Description: Scans all .java files for Struts and Spring Framework Usage(API/Methods/Class/Interface/Exception/Fields).
# Usage: javaFrameworkScan.sh SourceFolder FrameworkType(Spring/Struts)
# SourceFolder: Workspace where Java source files are present.
# FrameworkType: Either Struts or Spring
# Output: 1. List of Standard and Non-Standard Libraries/Jar
#         2. List of Affected Files with line numbers and source code
#         3. Remedy Steps for Each Affected Line of Source Code
# Created by: Bhavna Harinkhede
# Date: 21/06/2018
#

if [ $# -ne 2 ]; then
    echo "Usage: javaFrameworkScan.sh SourceFolder FrameworkType(Spring/Struts/Jsf)"
    echo "Usage Example: ./javaFrameworkScan.sh /home/bhavna/Workspace/work Spring"
    exit 1
fi

sourceFolder="${1%/}"
scanType="$2"
echo

#PJHOME="/path/to/PJHOME"  # Replace with the actual path to PJHOME

CommonRules="$PJHOME/JavaRules/JavaCommonRules"
if [ "$scanType" = "Spring" ]; then
    rulesPath="$PJHOME/JavaRules/SpringRules"
elif [ "$scanType" = "Struts" ]; then
    rulesPath="$PJHOME/JavaRules/StrutsRules"
elif [ "$scanType" = "Jsf" ]; then
    rulesPath="$PJHOME/JavaRules/JSFRules"
else
    echo "Framework Type should be either Spring, Struts, or Jsf"
    exit 1
fi

if [ -f keywords2scan ]; then
    rm -f keywords2scan
fi

if [ -f javalist.txt ]; then
    rm -f javalist.txt
fi

if [ -f sourceScanImports.txt ]; then
    rm -f sourceScanImports.txt
fi

if [ -f uniqSourceScanImports.txt ]; then
    rm -f uniqSourceScanImports.txt
fi

if [ -f uniqKeywords2scan ]; then
    rm -f uniqKeywords2scan
fi

if [ -f rulesGrepped.txt ]; then
    rm -f rulesGrepped.txt
fi

if [ -f uniqRulesGrepped.txt ]; then
    rm -f uniqRulesGrepped.txt
fi

if [ -f sourceCode2Remedy ]; then
    rm -f sourceCode2Remedy
fi

if [ -f sourceScanRemedy ]; then
    rm -f sourceScanRemedy
fi

if [ -f affectedSourceInformation ]; then
    rm -f affectedSourceInformation
fi

find "$sourceFolder/" -name "*.java" > javalist.txt
while IFS= read -r file; do
    grep -inH "import" "$file" >> sourceScanImports.txt
done < javalist.txt
cut -d ' ' -f2 sourceScanImports.txt | cut -d ';' -f1 | sed 's/[ ]//g' | sort -u > uniqSourceScanImports.txt

while IFS= read -r import; do
    Apiflag=0
    if grep -Fq "$import" "$rulesPath/"*.rules; then
        grep "$import" "$rulesPath/"*.rules | cut -d ':' -f2 >> rulesGrepped.txt
        Apiflag=1
    else
        Count=$(echo "$import" | awk -F'.' '{ print NF }')
        k=0
        while [ "$k" -lt "$Count" ]; do
            Apitocheck=$(echo "$import" | rev | cut -d '.' -f2- | rev)
            if grep -Fq "$Apitocheck" "$rulesPath/"*.rules; then
                grep "$Apitocheck" "$rulesPath/"*.rules | cut -d ':' -f2 >> rulesGrepped.txt
                Apiflag=1
            fi
            k=$((k + 1))
        done
    fi
done < uniqSourceScanImports.txt

sort -u rulesGrepped.txt > uniqRulesGrepped.txt

touch sourceCode2Remedy

while IFS= read -r line; do
    lib2Grep=$(echo "$line" | awk '{ print $3 }' | sed 's/[ ]//g')
    word2Grep=$(echo "$line" | awk '{ print $4 }' | cut -d '(' -f1 | sed 's/[ ]//g')
    rule2Grep=$(echo "$line" | awk '{ print $1 }' | sed 's/[ ]//g')
    while IFS= read -r file; do
        if grep -Fq "$lib2Grep" "$file"; then
            if grep -E -v "import|\*|//" "$file" | grep -Fq "$word2Grep"; then
                grep -inH "$word2Grep" "$file" | grep -v "import" | grep -v "*" | grep -v "//" | while IFS= read -r code; do
                    echo -e "$rule2Grep\t$code" >> sourceCode2Remedy
                done
            fi
        fi
    done < javalist.txt
done < uniqRulesGrepped.txt

if [ -s sourceCode2Remedy ]; then
    while IFS= read -r code; do
        ruleId=$(echo "$code" | awk '{ print $1 }' | sed 's/[ ]//g')
        fileName=$(echo "$code" | awk -F ':' '{ print $1 }')
        lineNumber=$(echo "$code" | awk -F ':' '{ print $2 }')
        affectedSource=$(echo "$code" | cut -d ':' -f3)
        remedyStep=$(grep "$ruleId" uniqRulesGrepped.txt | awk '{ print $5 }')
        echo -e "$ruleId\t$fileName\t$lineNumber\t$remedyStep" >> sourceScanRemedy
        echo -e "$fileName\t$lineNumber\t$affectedSource" >> affectedSourceInformation
    done < sourceCode2Remedy
else
    echo "No affected source code found."
fi