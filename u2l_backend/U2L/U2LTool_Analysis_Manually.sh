#!/bin/sh
#################################################################################################
##      Author          :       Phaneeswara Reddy.A                          		       ##
##      E-Mail          :       phaneeswara.red.annapu-reddy@hpe.com                   	       ##
##      Created Date    :       2017-0404       
##	Version		:	0.4
##      Description     :       This script will perform preparatory tasks after 	       ##
##				installation of U2L tool. Perform Sourcecheck for ^M	       ##
##				characters, Classifies files based on programming	       ##
##				language, executes stepcounter to find no.of LoC and	       ##
##				generates source code by removing all comments.		       ##
##      Usage           :       ./U2LTool_Analysis.sh <Workspace_Path> <Analysis_Language>     ##
##      Input           :       Workspace directory.			                       ##
#################################################################################################
START=$(date +%s)
today=`date '+%Y-%m%d'`
if [ $# -ne 2 ] ;
then
        echo "Usage: . ./U2LTool_Analysis.sh <Workspace_Path> <Analysis_Language>"
        echo "<Workspace_Path>: A vaild linux directory path where U2L tool is installed."
	echo "<Analysis_Language>: Programming language for which analysis is performed."
        echo "Eg: ./U2LTool_Analysis.sh /home/username/workspace C|SHELL|JAVA|PHP"
        exit 1
fi
Input2=$(echo "$2" | tr '[:upper:]' '[:lower:]')
##################################################################
if [ $Input2 == "javaanalysis" ] ;
then
Input2=java
fi
if [ $Input2 == "canalysis" ] ;
then
Input2=C
fi
if [ $Input2 == "shellanalysis" ] ;
then
Input2=shell
fi
if [ $Input2 == "phpanalysis" ] ;
then
Input2=php
fi

###################################################################
#echo "PJHOME:$PJHOME"
#echo "APNAME:$APNAME"
if [[ $PJHOME != "$1" ]] ;
then
	echo "Specified workspace $1 is different to the workspace: $PJHOME where U2LTool is installed."
	exit 1
fi
src_work=$PJHOME/work/$APNAME
log_work=$PJHOME/log/$APNAME
if [ "$(ls -A $src_work)" ] ;
then
	echo "Source Directory contains files"
else
	echo "Source Directory is empty"
	exit 1
fi
if [ $Input2 == "java" ] ;
then
	echo -e "\n getting the 2nd Comamnd line arg from user is :$2 "
	echo -e  "getting the 2nd parameter after comparing :$Input2"
	read -p "Enter source jdk version: " jdksrc_ver
    read -p "Enter Target jdk version: " jdktarget_ver
    read -p "Enter source JSP version: " jspsrc_ver
    read -p "Enter target JSP version: " jsptarget_ver
    read -p "Enter source Servlet version: " servsrc_ver
    read -p "Enter target Servlet version: " servtarget_ver
fi
# Log_Source_Analysis_`date '+%Y%m%d-%H%M'`.log
echo "Output generated to $PJHOME/log/$APNAME/Log_Source_Analysis_`date '+%Y%m%d'`.log"
exec &> $PJHOME/log/$APNAME/Log_Source_Analysis_`date '+%Y%m%d'`.log

	echo -e "\n Starting Preparatory tasks execution"
        echo "checking PATH of src_work: $src_work"
	####======= This COndition is for Java folder exit in $src_work During JavaAnalysis=======########
        if [[  -d $PJHOME/work/$APNAME/java/ ]];
        then
        echo "This is for re-run the createJavaTargetFileList.sh "
        rm -rf $PJHOME/work/$APNAME/java
        echo "after deleting the java folder"
        fi
        ####======= This Condition is for Java folder exit in $src_work During JavaAnalysis=======########

	cd $src_work
        ########### if make file is not provided in C/C++ then mak folder which createed $src_work in fisrt run we have to remove ###########"
	if [[  -f $PJHOME/work/$APNAME/makefiles.out ]];
	then
	echo "This will make sure that in $src_work folder only have source_code and new folder"
	rm -rf $PJHOME/work/$APNAME/mak
	rm -rf $PJHOME/work/$APNAME/makefiles.out
	rm -rf $PJHOME/work/$APNAME/NOTFOUND.out
	echo " After deleting the mak folder and .out file "
	fi
	########### if make file is not provided in C/C++ then mak folder which createed $src_work in fisrt run we have to remove ###########"

	echo "###########  Executing 0012_phpManagePharFiles Starts ###########"
	if [ $Input2 == "php" ] ;
	then
        echo "searching for .phar file "
        echo $src_work
	$PJHOME/bin/0012_phpManagePharFiles.sh $src_work
	fi
        echo "###########  Executing 0012_phpManagePharFiles ends ###########"

        echo "###########  Executing 0006_srccheck Starts ###########"	    	 
	$PJHOME/bin/0006_srccheck .
	echo "checking the new folder after src_work : $src_work/new"
	echo "###########  Execution 0006_srccheck Ends ###########"

	cd $src_work/new/

	echo -e "\n\n###########  Executing 0000_classify_files Starts  ###########"
	$PJHOME/bin/0000_classify_files .
	outdir=$PJHOME/log/$APNAME/srccheck/$today/*.out
	echo -e "\n\n###########  Execution 0000_classify_files Ends ###########"

	echo -e "\n\n###########  Execution 0001_stepcounter Starts  ###########"
	for outfile in $outdir ;
	do
		$PJHOME/bin/0001_stepcounter $outfile
	done
	echo -e "\n\n###########  Execution 0001_stepcounter Ends ###########"

	echo -e "\n\n###########  Execution 0004_comment-erase-all Starts  ###########"
	#for outfile in $outdir ;
	#do
	#	$PJHOME/bin/0004_comment-erase-all $outfile $PJHOME/src/master/nocomment
	
	#done
	echo -e "\n\n###########  Execution Ends 0004_comment-erase-all  ###########
	
	echo -e "\n\n###########  Execution Starts 0008_incfilecheck  ###########"
	for outfile in $outdir ;
	do
		$PJHOME/bin/0008_incfilecheck.sh $outfile
	done
	echo -e "\n\n###########  Execution Ends 0008_incfilecheck  ###########"

	echo -e "\n Completed Preparatory Tasks Successfully"

echo -e "\n Preparatory tasks already completed. Proceeding for CodeAnalysis."

#### C/C++ Analysis Portion ####
echo "i am here" $2
if [[ $Input2  = "C"  ]] ;
then
	echo -e "\n============  Performing C/C++ Sourcecode Analysis Starts ============"
	echo -e "\n getting the 2nd Comamnd line arg from user is :$2 "
	echo -e "\n getting the 2nd parameter after comparing :$Input2"
	echo "Inside C/C++ Analysis cehcking PATH of src_work: $src_work"
	cd $src_work

	echo -e "\n\n###########  Executing Makefile related tasks Starts ###########"
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/make_files.out ] ;
	then
		echo "Makefiles present in provided source code."
		echo "Compiling source code using makefile. Output will be generated at $PJHOME/log/$APNAME/build/$today"
		$PJHOME/bin/1030_tgt-gmake $PJHOME/log/$APNAME/srccheck/$today/make_files.out
	else
		echo "Makefiles not present in provided source code."
		echo "Creating makefiles using scripts at $src_work/mak"
		export AS_WORK=$src_work
		echo "src_work is :src_work"
		$PJHOME/bin/0700_preas-makemk $PJHOME/work/$APNAME
#		$PJHOME/bin/0700_preas-makemk 
		find mak/ -name *.mk > makefiles.out
		export AS_WORK=$src_work
		$PJHOME/bin/1022_make-all.sh makefiles.out linuxgcc		#We can have other options hpuxcc|linuxgcc|ca|cproto|pt|clean
	fi
	echo -e "\n\n###########  Executing Makefile related tasks Finsished ###########"


	echo -e "\n\n########## creating checkanalysis folder which will have impact for 64bit/Endian issues ###########"
	mkdir -p $log_work/checkanalysis
	#ln -s $PJHOME/src/master/nocomment/* .

	echo -e "\n\n###########  Executing 4000_exec-stk  Starts  ###########"
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/c_files.out ] ;
	then
		echo -e "\nExecuting STK Analysis on c files"
		$PJHOME/bin/4000_exec-stk STKSL $PJHOME/log/$APNAME/srccheck/$today/c_files.out .

		# Copying generated log files as STK creates same file for both C and CPP.
		cp $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_detail.txt $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_detail_C.txt
		cp $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_summary.txt $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_summary_C.txt
	       #cp $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_detail.txt $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_detail_C.txt
	        cp $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_detail.txt $PJHOME/log/$APNAME/stk/$today/allfunc_detail.txt
		cp $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_summary.txt $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_summary_C.txt
	fi
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out ] ;
	then
		echo -e "\nExecuting STK Analysis on cpp files"
        	$PJHOME/bin/4000_exec-stk STKSL $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out .
	
		# Copying generated log files as STK creates same file for both C and CPP.
		cp $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_detail.txt $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_detail_CPP.txt
		cp $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_summary.txt $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_summary_CPP.txt
	       #cp $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_detail.txt $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_detail_CPP.txt
		cp $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_detail.txt $PJHOME/log/$APNAME/stk/$today/allfunc_detail.txt
		cp $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_summary.txt $PJHOME/log/$APNAME/stk/$today/allfunc-`date +%Y-%m%d`_summary_CPP.txt
	fi
	echo -e "\n\n###########  Executing 4000_exec-stk  Finsished  ###########"


	echo -e "\n\n###########  Executing 5000_path_check Starts  ###########"
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/c_files.out ] ;
	then
        	echo -e "\nExecuting environment Analysis on c files. Output present at $PJHOME/log/$APNAME/Log_Envcheck_CFiles_$today.log"
	        $PJHOME/bin/5000_path_check $PJHOME/log/$APNAME/srccheck/$today/c_files.out > $PJHOME/log/$APNAME/Log_Envcheck_CFiles_$today.log
	fi
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out ] ;
	then
        	echo -e "\nExecuting environment Analysis on cpp files. Output present at $PJHOME/log/$APNAME/Log_Envcheck_CPPFiles_$today.log"
	        $PJHOME/bin/5000_path_check $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out > $PJHOME/log/$APNAME/Log_Envcheck_CPPFiles_$today.log
	fi
	echo -e "\n\n###########  Executing 5000_path_check  Finsished ###########"


	echo -e "\n\n###########  Execution Starts for  6000_64bit_report.sh  ###########"
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/c_files.out ] ;
	then
        	#echo -e "\nExecuting 64-bit Analysis on c files. Output present in 64bit_C_reportlog and excludes_64bit_C.log at $src_work/checkanalysis/"
		echo -e "\nExecuting 64-bit Analysis on c files. Output present in 64bit_C_reportlog and excludes_64bit_C.log at $log_work/checkanalysis/"
		$PJHOME/bin/6000_64bit_report.sh $PJHOME/log/$APNAME/srccheck/$today/c_files.out
		mv $src_work/64bit_reportlog $log_work/checkanalysis/64bit_C_reportlog
		mv $src_work/excludes.log  $log_work/checkanalysis/excludes_64_C.log
		cd $log_work/checkanalysis  #ALL 64bit issue will be present here  $log_work/checkanalysis#
		$PJHOME/bin/6002_64bit_sum.sh 64bit_C_reportlog
		echo -e "\nProbable impact list of 64-bit analysis for C logged to: $PJHOME/log/$APNAME/64bit_ExtractList-C_`date '+%Y%m%d-%H%M'`.out"
		6005_64bit-match-exclude.pl $PJHOME/log/$APNAME/srccheck/$today/c_files.out $PJHOME/etc/64bit.match $PJHOME/etc/64bit.exclude 2> $PJHOME/log/$APNAME/64bit_ExcludeList-C_`date '+%Y%m%d-%H%M'`.out 1> $PJHOME/log/$APNAME/64bit_ExtractList-C_`date '+%Y%m%d-%H%M'`.out
	fi
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out ] ;
	then
	        #echo -e "\nExecuting 64bit Analysis on cpp files. Output present in 64bit_CPP_reportlog and excludes_64bit_CPP.log at $src_work/checkanalysis/"
		echo -e "\nExecuting 64bit Analysis on cpp files. Output present in 64bit_CPP_reportlog and excludes_64bit_CPP.log at $log_work/checkanalysis/"
		cd $src_work/
                $PJHOME/bin/6000_64bit_report.sh $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out
                mv $src_work/64bit_reportlog $log_work/checkanalysis/64bit_CPP_reportlog
                mv $src_work/excludes.log  $log_work/checkanalysis/excludes_64_CPP.log
                cd $log_work/checkanalysis  #ALL 64bit issue will be present here  $log_work/checkanalysis#
                $PJHOME/bin/6002_64bit_sum.sh 64bit_C_reportlog
		echo -e "\nProbable impact list of 64-bit analysis for CPP logged to: $PJHOME/log/$APNAME/64bit_ExtractList-CPP_`date '+%Y%m%d-%H%M'`.out"
		6005_64bit-match-exclude.pl $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out $PJHOME/etc/64bit.match $PJHOME/etc/64bit.exclude 2> $PJHOME/log/$APNAME/64bit_ExcludeList-CPP_`date '+%Y%m%d-%H%M'`.out 1> $PJHOME/log/$APNAME/64bit_ExtractList-CPP_`date '+%Y%m%d-%H%M'`.out
	fi
	echo -e "\nClassified 64-bit Analysis to:\n\t1. 64bit_reportlog_bit\n\t2. 64bit_reportlog_huge\n\t3. 64bit_reportlog_int\n\t4. 64bit_reportlog_longpo\n\t5. 64bit_reportlog_x"
	echo -e "\n\n###########  Execution Ends for  6000_64bit_report.sh  ###########"


	echo -e "\n\n###########  Execution Starts for 7000_endian_report.sh  ###########"
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/c_files.out ] ;
	then
	        echo -e "\n Executing Endian Analysis on c files. Output present in endian_C_reportlog and excludes_endian_C.log at $log_work/checkanalysis/"
		cd $src_work/
	        $PJHOME/bin/7000_endian_report.sh $PJHOME/log/$APNAME/srccheck/$today/c_files.out
		mv $src_work/endian_reportlog  $log_work/checkanalysis/endian_C_reportlog
		mv $src_work/excludes.log  $log_work/checkanalysis/excludes_C_endian.log
                #mv $src_work/excludes_endian.log  $log_work/checkanalysis/excludes_C_endian.log
		cd $log_work/checkanalysis  #ALL Endian  issue will be present here  $log_work/checkanalysis#
		# Moving generated log files as same files will be created for both C and CPP.
	        $PJHOME/bin/7002_endian_sum.sh endian_C_reportlog
	fi
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out ] ;
	then
	        echo -e "\n Executing endian Analysis on cpp files. Output present in endian_CPP_reportlog and excludes_endian_CPP.log at $src_work/checkanalysis/"
		cd $src_work/
                $PJHOME/bin/7000_endian_report.sh $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out
                mv $src_work/endian_reportlog  $log_work/checkanalysis/endian_CPP_reportlog
		mv $src_work/excludes.log  $log_work/checkanalysis/excludes_CPP_endian.log
                cd $log_work/checkanalysis  #ALL Endian issue will be present here  $log_work/checkanalysis
                # Moving generated log files as same files will be created for both C and CPP.
                $PJHOME/bin/7002_endian_sum.sh endian_CPP_reportlog

	fi
	echo -e "\nClassified Endian Analysis to:\n\t1. endian_reportlog_bit\n\t2. endian_reportlog_file\n\t3. endian_reportlog_net\n\t4. endian_reportlog_union"
	echo -e "\n\n###########  Execution Ends for 7000_endian_report.sh  ###########"

	echo -e "\n\n###########  Execution Starts for 8000_getcharval  ###########"
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/c_files.out ] ;
	then
	        echo -e "\n Executing String Analysis on c files"
	        cd $src_work/new/
	        $PJHOME/bin/8000_getcharval $PJHOME/log/$APNAME/srccheck/$today/c_files.out
		# Moving generated log files as same files will be created for both C and CPP.
	        echo "-----------------------"
		$PJHOME/bin/8030_funccalls $PJHOME/log/$APNAME/srccheck/$today/c_files.out
	        echo "-----------------------"
		$PJHOME/bin/8003_memcheck-charlist $PJHOME/log/$APNAME/srccheck/$today/c_files.out $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_detail_C.txt
		echo "============ 8003_memcheck-charlist will call internally 8001_char-memcheck and 8002_make-charlist for c_files.out=================="
	fi
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out ] ;
	then
	        echo -e "\n Executing String Analysis on cpp files"
	        $PJHOME/bin/8000_getcharval $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out
		# Moving generated log files as same files will be created for both C and CPP.
		echo "-----------------------"
	        $PJHOME/bin/8030_funccalls $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out
		echo "-----------------------"
	        $PJHOME/bin/8003_memcheck-charlist $PJHOME/log/$APNAME/srccheck/$today/cpp_files.out $PJHOME/log/$APNAME/stk/$today/stk-`date +%Y-%m%d`_detail_CPP.txt
		echo "============ 8003_memcheck-charlist will call internally 8001_char-memcheck and 8002_make-charlist cpp_files.out=================="

	echo -e "\n\n###########  Execution Ends for 8000_getcharval  ###########"

	fi
	echo -e "\n============  Performing C/C++ Sourcecode Analysis completed  ============"
	END=$(date +%s)
	C_DIFF=$(( $END - $START ))
	echo "For CAnalysis It took $C_DIFF seconds"
fi


#### Shell Script Analysis Portion ####
if [ $Input2 == "shell" ] ;
then
	echo -e "\n============  Performing SHELL Script Sourcecode Analysis  ============"
	echo -e "\n getting the 2nd Comamnd line arg from user is :$2 "
	echo -e "\n getting the 2nd parameter after comparing :$Input2" 
	
	echo -e "\n============  For this script(.ksh/.csh/.sh) which does not have shebang line it will also go to ot1_list.out  ============"

	mkdir -p $src_work/shell
	cd $src_work/
	#ln -s $PJHOME/src/master/nocomment/* .
	mkdir -p $PJHOME/log/$APNAME/shell/parse/$today $PJHOME/log/$APNAME/shell/env/$today $PJHOME/log/$APNAME/shell/shebang/$today $PJHOME/log/$APNAME/shell/syntax/$today
	mkdir -p $PJHOME/log/$APNAME/scriptCheck/$today
	shelltype=`which sh`

	if [ -f $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out ] ;
	then
		k_shell=`which ksh`
		echo -e "\nThere are scripts generated in kshell. Path of kshell: $k_shell"
		if [ -z $k_shell ] ;
		then
			echo "ksh is not installed on this device"
		else
			#`env DEFAULT_SHEBANG=$k_shell` /usr/local/hpscan/shanalyze/checkScriptSyntax.sh $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out
			 env DEFAULT_SHEBANG=$k_shell /usr/local/hpscan/shanalyze/checkScriptSyntax.sh $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out > $PJHOME/log/$APNAME/scriptCheck/$today/ksh_scriptCheck_`date "+%Y-%m%d-%H%M"`.txt

			/usr/local/hpscan/shanalyze/kshparser.sh `cat $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out` > $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed.out
			cp $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed.out $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_mod.out
			/usr/local/hpscan/shanalyze/parserOutputCheck.sh $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_mod.out >  $PJHOME/log/$APNAME/shell/parse/$today/ksh_Warning_error_parsed.out
			sort -u $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_mod.out | sort -t ' ' -k 3,3 -k 5,5 -k 6,6n > $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_uniq.out
			if [ "`uname`" = "AIX" ] ;
			then
				/usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out /usr/local/hpscan/def/env_aix.def > $PJHOME/log/$APNAME/shell/env/$today/ksh_env_aix.txt
				/usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out /usr/local/hpscan/def/filepath_aix.def > $PJHOME/log/$APNAME/shell/env/$today/ksh_filepath_aix.txt
			elif [[ "`uname`" = "HP-UX" || "`uname`" = "Linux" ]] ;
			then
				/usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out /usr/local/hpscan/def/env_common.def > $PJHOME/log/$APNAME/shell/env/$today/ksh_env_common.txt
				/usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out /usr/local/hpscan/def/filepath_common.def > $PJHOME/log/$APNAME/shell/env/$today/ksh_filepath_common.txt
			fi
			/usr/local/hpscan/shanalyze/extractShebangLine.sh $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out > $PJHOME/log/$APNAME/shell/shebang/$today/ksh_shebang.txt
			/usr/local/hpscan/shanalyze/extractHereDocument.sh $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out > $PJHOME/log/$APNAME/shell/syntax/$today/ksh_heredocument.txt
		fi
	fi
	
	if [ -f $PJHOME/log/$APNAME/srccheck/$today/csh_list.out ] ;
        then
                c_shell=`which csh`
                echo -e "\nThere are scripts generated in cshell. Path of cshell: $c_shell"
		if [ -z $c_shell ];
		then
			echo "csh is not installed on this device"
		else
                        # `env DEFAULT_SHEBANG=$c_shell` /usr/local/hpscan/shanalyze/checkScriptSyntax.sh $PJHOME/log/$APNAME/srccheck/$today/csh_list.out
			  env DEFAULT_SHEBANG=$c_shell /usr/local/hpscan/shanalyze/checkScriptSyntax.sh $PJHOME/log/$APNAME/srccheck/$today/csh_list.out > $PJHOME/log/$APNAME/scriptCheck/$today/csh_scriptCheck_`date "+%Y-%m%d-%H%M"`.txt
        	        /usr/local/hpscan/shanalyze/cshparser.sh `cat $PJHOME/log/$APNAME/srccheck/$today/csh_list.out` > $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed.out
                	cp $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed.out $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_mod.out
			/usr/local/hpscan/shanalyze/parserOutputCheck.sh $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_mod.out > $PJHOME/log/$APNAME/shell/parse/$today/csh_warnning_error_parsed_mod.out
        	        sort -u $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_mod.out | sort -t ' ' -k 3,3 -k 5,5 -k 6,6n > $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_uniq.out
			if [ "`uname`" = "AIX" ] ;
	                then
        	                /usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/csh_list.out /usr/local/hpscan/def/env_aix.def > $PJHOME/log/$APNAME/shell/env/$today/csh_env_aix.txt
                	        /usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/csh_list.out /usr/local/hpscan/def/filepath_aix.def > $PJHOME/log/$APNAME/shell/env/$today/csh_filepath_aix.txt
	                elif [[ "`uname`" = "HP-UX" || "`uname`" = "Linux" ]] ;
        	        then
                	        /usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/csh_list.out /usr/local/hpscan/def/env_common.def > $PJHOME/log/$APNAME/shell/env/$today/csh_env_common.txt
                        	/usr/local/hpscan/shanalyze/extractKeyword.pl $PJHOME/log/$APNAME/srccheck/$today/csh_list.out /usr/local/hpscan/def/filepath_common.def > $PJHOME/log/$APNAME/shell/env/$today/csh_filepath_common.txt
	                fi
			/usr/local/hpscan/shanalyze/extractShebangLine.sh $PJHOME/log/$APNAME/srccheck/$today/csh_list.out > $PJHOME/log/$APNAME/shell/shebang/$today/csh_shebang.txt
			/usr/local/hpscan/shanalyze/extractHereDocument.sh $PJHOME/log/$APNAME/srccheck/$today/csh_list.out > $PJHOME/log/$APNAME/shell/syntax/$today/csh_heredocument.txt
		fi
        fi
	if [[ -f $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out &&  -f $PJHOME/log/$APNAME/srccheck/$today/csh_list.out || -z $k_shell && -z $c_shell ]] ;
	then
		cat $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_uniq.out $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_uniq.out > $PJHOME/log/$APNAME/shell/parse/$today/merge_parsed.out
		/usr/local/hpscan/shanalyze/summaryParserOutput.pl $PJHOME/log/$APNAME/shell/parse/$today/merge_parsed.out . > $PJHOME/log/$APNAME/shell/parse/$today/parsed_summary.out
		/usr/local/hpscan/shanalyze/scriptParamParser.pl $PJHOME/log/$APNAME/shell/parse/$today/merge_parsed.out > $PJHOME/log/$APNAME/shell/parse/$today/script_parameter_parsed.out
		cat $PJHOME/log/$APNAME/shell/shebang/$today/csh_shebang.txt $PJHOME/log/$APNAME/shell/shebang/$today/ksh_shebang.txt | sed -e 's/\#//g' -e 's/\!//g'  |  cut -f1 | sort | uniq -c
	elif [[ -f $PJHOME/log/$APNAME/srccheck/$today/ksh_list.out && -z $k_shell ]] ;
	then
		/usr/local/hpscan/shanalyze/summaryParserOutput.pl $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_uniq.out . > $PJHOME/log/$APNAME/shell/parse/$today/parsed_summary.out
		/usr/local/hpscan/shanalyze/scriptParamParser.pl $PJHOME/log/$APNAME/shell/parse/$today/ksh_parsed_uniq.out > $PJHOME/log/$APNAME/shell/parse/$today/script_parameter_parsed.out
	 cat $PJHOME/log/$APNAME/shell/shebang/$today/ksh_shebang.txt | sed -e 's/\#//g' -e 's/\!//g'  |  cut -f1 | sort | uniq -c

	elif [[ -f $PJHOME/log/$APNAME/srccheck/$today/csh_list.out && -z $c_shell ]] ;
	then
		/usr/local/hpscan/shanalyze/summaryParserOutput.pl $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_uniq.out . > $PJHOME/log/$APNAME/shell/parse/$today/parsed_summary.out
		/usr/local/hpscan/shanalyze/scriptParamParser.pl $PJHOME/log/$APNAME/shell/parse/$today/csh_parsed_uniq.out > $PJHOME/log/$APNAME/shell/parse/$today/script_parameter_parsed.out
	 cat $PJHOME/log/$APNAME/shell/shebang/$today/csh_shebang.txt | sed -e 's/\#//g' -e 's/\!//g'  |  cut -f1 | sort | uniq -c

	fi
	echo -e "\nResult of parserOutputCheck present at $PJHOME/log/$APNAME/shell/parse/$today/"
	echo -e "\nResult of Environment and filepath differences present at $PJHOME/log/$APNAME/shell/env/$today/"
	echo -e "\nResult of Shebang analysis present at $PJHOME/log/$APNAME/shell/shebang/$today/"
	echo -e "\nResult of HereDoc analysis present at $PJHOME/log/$APNAME/shell/syntax/$today/"
	echo -e "\n============  Performing SHELL Script Sourcecode Analysis completed  ============"
	END=$(date +%s)
	Shell_DIFF=$(( $END - $START ))
	echo "for ShellAnalysis It took $Shell_DIFF seconds"

fi

#### Java Analysis Portion ####

if [ $Input2 == "java" ] ;
then
	echo -e "\n getting the 2nd Comamnd line arg from user is :$2 "
	echo -e "\n getting the 2nd parameter after comparing :$Input2"
	if [[ ! -f $PJHOME/log/$APNAME/srccheck/$today/java_files.out ]] ;
	then
		echo -e "\nThere is no java_files.out file in $PJHOME/log/$APNAME/srccheck/$today/"
		exit 1
	fi
	echo -e "\n============  Performing JAVA Sourcecode Analysis  ============"

	echo "Inside JavaAnalysis cehcking PATH of src_work: $src_work"

	#==========creating java folder for target file list to be referred to by the migration impacted portion extraction tool==========#	
	mkdir -p $src_work/java
	#==========creating java folder for target file list to be referred to by the migration impacted portion extraction tool==========#

	cd $src_work/new/
	echo "###########  Executing 00010_javacwarning  Starts ###########"

        $PJHOME/bin/00010_javacwarning .
        echo "checking the new folder after src_work : $src_work/new"
        echo "###########  Execution 00010_javacwarning  Ends ###########"


	#ln -s $PJHOME/src/master/nocomment/* .
	
	#==========creating versiondiff and import older to store the package and OS/JDK/JSP/SERVLET difference informatio ===========#	

	mkdir -p $PJHOME/log/$APNAME/java/import/$today $PJHOME/log/$APNAME/java/versiondiff/$today

	#==========creating versiondiff and import older to store the package and OS/JDK/JSP/SERVLET difference informatio ===========#

	echo -e "\n--------Collecting Imported packages--------"
	perl /usr/local/hpscan/javaanalyze/extractImportLines.pl $PJHOME/log/$APNAME/srccheck/$today/java_files.out > $PJHOME/log/$APNAME/java/import/$today/import_lines.out
	find . -name "*.jsp" | grep -rn "import=" * > $PJHOME/log/$APNAME/java/import/$today/import_lines_jsp.out
	echo -e "\nOutput of Imported packages is present at $PJHOME/log/$APNAME/java/import/$today/\n\tJava\t: import_lines.out\n\tJSP\t: import_lines_jsp.out"
#	jdksrc_ver="$(java -version 2>&1|grep -o "1\.*."|head -1)"	# If you have to fetch installed jdk version.
	echo -e "\n--------Executing Import Summary Report--------"
#	read -p "Enter source jdk version to proceed with Java source analysis: " jdksrc_ver
#	read -p "Enter Target jdk version to proceed with Java source analysis: " jdktarget_ver
	perl /usr/local/hpscan/javaanalyze/createImportSummaryReportData.pl -b $jdksrc_ver -n $jdktarget_ver $PJHOME/log/$APNAME/java/import/$today/import_lines.out $src_work/java/ > $PJHOME/log/$APNAME/java/import/$today/import_summary_report_data.out
	echo -e "\nOutput of createImportSummaryReportData.pl present at $PJHOME/log/$APNAME/java/import/$today/import_summary_report_data.out"
	echo -e "\n--------Creating Target Java Filelist--------"

	####=====Executing the Migration Impacted Portion Extraction Tool we have to create .txt file as per grep_keywords.pl=====#######
	cd $src_work/java/
        ####=====Executing the Migration Impacted Portion Extraction Tool we have to create .txt file as per grep_keywords.pl=====#######

	/usr/local/hpscan/javaanalyze/createJavaTargetFileList.sh $PJHOME/log/$APNAME/srccheck/$today
	
	echo -e "\nExecuting Analysis for JDK differences...."

	perl /usr/local/hpscan/javaanalyze/grep_keywords.pl -b $jdksrc_ver -n $jdktarget_ver $src_work/new/ JDK > $PJHOME/log/$APNAME/java/versiondiff/$today/jdk_diff.out
	if [[ `grep ".jsp" $PJHOME/log/$APNAME/srccheck/$today/java_files.out | wc -l` -ge 1 ]] ;
	then
 		echo -e "\nExecuting Analysis for JSP differences...."
#		read -p "Enter source JSP version: " jspsrc_ver
#		read -p "Enter target JSP version: " jsptarget_ver
		perl /usr/local/hpscan/javaanalyze/grep_keywords.pl -b $jspsrc_ver -n $jsptarget_ver $src_work/new/ JSP > $PJHOME/log/$APNAME/java/versiondiff/$today/jsp_diff.out
	fi
	
	echo -e "\nExecuting Analysis for SERVLET differences...."
#	read -p "Enter source Servlet version: " servsrc_ver
#	read -p "Enter target Servlet version: " servtarget_ver
	perl /usr/local/hpscan/javaanalyze/grep_keywords.pl -b $servsrc_ver -n $servtarget_ver $src_work/new/ Servlet > $PJHOME/log/$APNAME/java/versiondiff/$today/servlet_diff.out
	echo -e "\nExecuting Analysis for OS differences...."
	perl /usr/local/hpscan/javaanalyze/grep_keywords.pl $src_work/new/ OS > $PJHOME/log/$APNAME/java/versiondiff/$today/OS_diff.out
	echo -e "\nVersion differences output is placed under $PJHOME/log/$APNAME/java/versiondiff/$today"

	echo -e "\n============  Performing JAVA Sourcecode Analysis completed  ============"
	END=$(date +%s)
	Java_DIFF=$(( $END - $START ))
	echo "for JavaAnalysis It took $Java_DIFF seconds"
fi
if [ $Input2 == "php" ] ;
then
        echo -e "\n getting the 2nd Comamnd line arg from user is :$2 "
        echo -e "\n getting the 2nd parameter after comparing :$Input2"
        if [[ ! -f $PJHOME/log/$APNAME/srccheck/$today/php_files.out ]] ;
        then
                echo -e "\nThere is no php_files.out file in $PJHOME/log/$APNAME/srccheck/$today/"
                exit 1
        fi
        echo -e "\n============  Performing PHP Sourcecode Analysis  ============"

        echo "Inside PHPAnalysis checking PATH of src_work: $src_work"

        #==========creating versiondiff  folder to store the PHP version difference information  ===========#

        mkdir -p  $PJHOME/log/$APNAME/php/versiondiff/$today


        #==========Executing 0013_phpRemedyScan.sh to identify the changes to be made to the code" ===========#
          echo " Running Code PHP Code Scan to identify the changes to be made to the code" 
          $PJHOME/bin/0013_phpRemedyScan.sh $log_work/srccheck/$today/php_files.out  $log_work/php/versiondiff/$today
	  END=$(date +%s)
          PHP_DIFF=$(( $END - $START ))
	  echo "for PHPAnalysis It took $PHP_DIFF seconds"

fi
