#!/bin/sh
##########################################################################################
##	Author		:	Phaneeswara Reddy.A					##
##	E-Mail		:	phaneeswara.red.annapu-reddy@hpe.com			##
##	Created Date	:	2017-0403	
##	Version		:	0.4
##	Description	:	This script will perform installation of U2L tool.	##
##				Creates the workspace, inside that log and work		##
##				directories. And also places the required script	##
##				files to respective directories.			##
##	Usage		:	. ./U2LTool_Install.sh <Workspace_Path> <APNAME_Value>	##
##	Input		:	Workspace directory and APNAME value.			##
##########################################################################################
############## package that need to installed before executing the U2LTool_Analysis.sh START##########
if [ "$(rpm -qa | grep jdk)" != "" ] ;
then
        echo "Java is Installed"
else
        echo "Java need to be installed before executing the U2LTool_Analysis.sh"
fi
if [ "$(rpm -qa | grep perl)" != "" ] ;
then
        echo "Perl is Installed"
else
        echo "perl need to be  installed before executing the U2LTool_Analysis.sh"
fi
if [ "$(rpm -qa | grep dos2unix)" != "" ] ;
then
        echo "Dos2unix is Installed"
else
        echo "Dos2unix need to installed installed before executing the U2LTool_Analysis.sh"
fi

if [ "$(rpm -qa | grep ksh)" != "" ] ;
then
        echo "ksh is Installed"
else
        echo "ksh need to installed installed before executing the U2LTool_Analysis.sh"
fi
############## package that need to installed before executing the U2LTool_Analysis.shi END##########


# Unzip tool and extract inside tar's to temporary directory
if [ $# -ne 2 ] ;
then
	echo "Usage: . ./U2LTool_Install.sh <Workspace_Path> <APNAME_Value>"
	echo "<Workspace_Path>: A vaild linux directory path to install U2L tool."
	echo "<APNAME_Value>: Name that represents kind of analysis performed."
	echo "Eg: . ./U2LTool_Install.sh /home/username/workspace CAnalysis|JavaAnalysis|ShellAnalysis"
#	exit 1
	echo "Re-run the script with valid parameters."
else
if [ -e `pwd`/Tools_V1.5.zip ] ;
then
	if [ -d $1 ] ;
	then
		echo -e "\nSpecified workspace directory $1 already exists\nCan not proceed with Tool Installation."
	else
		unzip Tools_V1.5.zip -d /tmp > /dev/null 2>&1
		tar --overwrite -xzf /tmp/Tools_V1.5/assess_tools_rev_1_11/assess-tools-rev_1_11.tar.gz -C /tmp/Tools_V1.5/assess_tools_rev_1_11/
		mkdir /tmp/Tools_V1.5/STKSL-1_0/STKSL /tmp/Tools_V1.5/STKSL-1_0/STKSL_32lib /tmp/Tools_V1.5/STKHL-1_0/STKHL
		tar --overwrite -xzf /tmp/Tools_V1.5/STKSL-1_0/STKSL200.tar.gz -C /tmp/Tools_V1.5/STKSL-1_0/STKSL
		tar --overwrite -xzf /tmp/Tools_V1.5/STKSL-1_0/32bit_libs_for_STKSL.tar.gz -C /tmp/Tools_V1.5/STKSL-1_0/STKSL_32lib
		tar --overwrite -xzf /tmp/Tools_V1.5/STKHL-1_0/STKHL-1_0.tar.gz -C /tmp/Tools_V1.5/STKHL-1_0/STKHL
		tar --overwrite -xzf /tmp/Tools_V1.5/hpscan_rev_1_5/hpscan-rev_1_5.tar.gz -C /tmp/Tools_V1.5/hpscan_rev_1_5/
		echo "Tool Extraction completed."

		# Create Workspace directory and Copy tools
		PJHOME=$1
		APNAME=$2
		PATH=$PATH:$PJHOME/bin:$PJHOME/tools:/usr/local/hpscan/shanalyze:/usr/local/hpscan/javaanalyze
		export PJHOME PATH APNAME
	
		echo "Environment variable PJHOME:$PJHOME"
		echo "Environment variable APNAME:$APNAME"
		mkdir -p "$PJHOME"
		chmod 777 $PJHOME
		echo "Your workspace for this activity: $PJHOME"
		cp -Rnf /tmp/Tools_V1.5/assess_tools_rev_1_11/assess-tools/* $PJHOME
	
		# Copy STK, Java and Shell analysis scripts
		cp -Rrf /tmp/Tools_V1.5/hpscan_rev_1_5/hpscan/ /usr/local/
		if [ `uname` = "HP-UX" ] ;
		then
			mkdir -p /etc/opt/STKHL /opt/STKHL
			cp -Rrf /tmp/Tools_V1.5/STKHL-1_0/STKHL/opt/STKHL/* /opt/STKHL
			cp -Rrf /tmp/Tools_V1.5/STKHL-1_0/STKHL/etc/opt/STKHL/* /etc/opt/STKHL
		elif [ `uname` = "Linux" ] ;
		then
			mkdir -p /etc/opt/STKSL /opt/STKSL
			cp -Rrf /tmp/Tools_V1.5/STKSL-1_0/STKSL/etc/opt/STKSL/* /etc/opt/STKSL
			cp -Rrf /tmp/Tools_V1.5/STKSL-1_0/STKSL/opt/STKSL200/* /opt/STKSL
			cp -Rrf /tmp/Tools_V1.5/STKHL-1_0/STKHL/opt/STKHL/bin/allfuncdetail /opt/STKSL/bin/
			cp -Rrf /tmp/Tools_V1.5/STKHL-1_0/STKHL/opt/STKHL/bin/allfuncsummary /opt/STKSL/bin/
			cp -Rrf /tmp/Tools_V1.5/STKHL-1_0/STKHL/opt/STKHL/lib.allfunc/ /opt/STKSL/
			#cp -nrf /tmp/Tools_V1.5/STKSL-1_0/STKSL_32lib/usr/lib/libstdc++.so.6 /usr/lib/		# This is required if we are running 32-bit device
			#cp -nrf /tmp/Tools_V1.5/STKSL-1_0/STKSL_32lib/lib/* /lib/				# This is required if we are running 32-bit device
			chmod 755 -R /opt/STKSL/
	                chmod 755 -R /etc/opt/STKSL/
			chmod 755 -R /usr/local/hpscan/
		fi
		# Set LANG environment
		export LANG=ja_JP.utf8
		export NLS_LANG=Japanese_Japan.UTF8		# Oracle
	
		export LC_MESSAGES=C
		export LC_CTYPES=C
	
		# Set Compiler path. Add Compile options. 
		# These may change based on path where user installed compilers. Enable the below if it is really required.
		#export CC_PATH="/usr/bin/cc +w +DD64 -D__HP_IGNORE__"
		#export CC_LD_PATH="/usr/bin/cc +DD64"
		#export GCC_PATH="/opt/hp-gcc/bin/gcc -Wall -mlp64"
		#export GCC_LD_PATH="/opt/hp-gcc/bin/gcc -mlp64"
	
		# Create directory structures required
		mkdir -p $PJHOME/src/master/nocomment $PJHOME/src/master/delivery $PJHOME/src/org
		mkdir -p $PJHOME/log/$APNAME $PJHOME/work/$APNAME
		chmod 755 -R $PJHOME/*

		rm -rf /tmp/Tools_V1.5/				# Remove extracted contents.
		echo "Tool installation completed."
	fi
else
	echo "Makesure Tools_V1.5.zip present in the directory where script execution initiated."
fi
fi
