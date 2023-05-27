#!/bin/sh

usage(){
	echo "usage : `basename $0` {tag_name|HEAD} releaseType csvFile"
	exit 1;
}

if [ $# -ne 3 ] ; then
	usage;
	return 1
fi

TAG_NAME=$1
TYPE=`echo $2 | tr "[A-Z]" "[a-z]"`
CSV_FILE=$3

if [ ! -r ${CSV_FILE} ] ; then
	echo "file:${CSV_FILE} cannot read."
	return 1;
fi

## modify releaseType for 2nd parameter
if [ ${TYPE} = "shell" ] ; then
	TARGET_CSV_FILE="${CSV_FILE%.*}_Shell.csv"
	egrep ",TWS,|,Shell,|,SQL,|,Conf," ${CSV_FILE} > ${TARGET_CSV_FILE}
elif [ ${TYPE} = "shell-conf" ] ; then
	TARGET_CSV_FILE="${CSV_FILE%.*}_Shell-Conf.csv"
	egrep ",TWS,|,Shell,|,SQL," ${CSV_FILE} > ${TARGET_CSV_FILE}
elif [ ${TYPE} = "c"  ] ; then
	TARGET_CSV_FILE="${CSV_FILE%.*}_C.csv"
	egrep ",C," ${CSV_FILE} > ${TARGET_CSV_FILE}
elif [ ${TYPE} = "java"  ] ; then
	TARGET_CSV_FILE="${CSV_FILE%.*}_Java.csv"
	egrep ",Java," ${CSV_FILE} > ${TARGET_CSV_FILE}
else
	echo "${TYPE} is unknown relese type."
	exit 1
fi

createArchiveFromCVS.sh ${TAG_NAME} ${TARGET_CSV_FILE}

