#!/bin/sh
#
# Revision: rev_1_0
#
# Name : phpManagePharFiles.sh
# Description  : Searches for all .phar files and extract them.
# Usage : phpManagePharFiles.sh SourceFolder
# SourceFolder : WorkSpace where PHP source files are present.
# Output: 1. List of Affected Files with line numbers and source code
#         2. Remedy Steps for Each Affected Line of Source Code
# Created by: Kalin
# Date : 27/07/2018
#
if [ $# -ne 1 ];
        then
                echo "Usage : phpManagePharFiles.sh SourceFolder"
                echo " Usage Example: sh phpManagePharFiles.sh /home/kalin/WorkSPace/work"
                 exit
fi
sourceFolder="${1%/}"

find $sourceFolder/ -name *.phar >pharlist.txt
if [ -f pharlist.txt ];
then 
        
	for i in `cat pharlist.txt`
	do
          filename=`basename $i | cut -d '.' -f1`
          echo $filename
          mkdir $sourceFolder/phar_tmp_$filename
          cp $i $sourceFolder/phar_tmp_$filename/
          cd $sourceFolder/phar_tmp_$filename/
          phar extract -f `basename $i`
          rm -rf $i
          cd -
        done
fi

