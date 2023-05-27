#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/2034_chk_ptype_ins.sh,v 1.3 2013/07/23 07:27:02 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 2034_chk_ptype_ins.sh
# 概要     : プロトタイプ宣言挿入チェックツール
# 実行方法 : 2034_chk_ptype_ins.sh FILELST
# 入力	   : FILELST : 2032_CPROTO_CHANGER.sh 出力結果ファイル
# 出力     : プロトタイプがない場合に
#		getOperationDate is not found in /JP3-Cxxxx/work/src/abc.c

#2223.sh,4241.sh,4142.sh Outputfile
INPUT_FILE=$1

while read DATA;do

 FILE_NAME=`echo "$DATA" | awk ' { print $1 } ' `
 FUNCTION=`echo "$DATA" | awk ' { print $2 } ' `

 PCFILE_NAME=`echo $FILE_NAME | sed 's/\.c/\.pc/'`

 if [ $FUNCTION = "atoi"  ];then 
  FUNCTION="\#include \<stdlib.h\>"
 elif [ $FUNCTION = "atol"  ];then
  FUNCTION="\#include \<stdlib.h\>"
 elif [ $FUNCTION = "bzero"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "free"  ];then
  FUNCTION="\#include \<stdlib.h\>"
 elif [ $FUNCTION = "getpid"  ];then
  FUNCTION="\#include \<sys/types.h\>"
 elif [ $FUNCTION = "isalnum"  ];then
  FUNCTION="\#include \<ctype.h\>"
 elif [ $FUNCTION = "isdigit"  ];then
  FUNCTION="\#include \<ctype.h\>"
 elif [ $FUNCTION = "isspace"  ];then
  FUNCTION="\#include \<ctype.h\>"
 elif [ $FUNCTION = "localtime"  ];then
  FUNCTION="\#include \<time.h\>"
 elif [ $FUNCTION = "memcmp"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "memcpy"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "memset"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "sqlald"  ];then
  FUNCTION="\#include \<sqlcpr.h\>"
 elif [ $FUNCTION = "sqlclu"  ];then
  FUNCTION="\#include \<sqlcpr.h\>"
 elif [ $FUNCTION = "sqlglm"  ];then
  FUNCTION="\#include \<sqlcpr.h\>"
 elif [ $FUNCTION = "sqlnul"  ];then
  FUNCTION="\#include \<sqlcpr.h\>"
 elif [ $FUNCTION = "sqlprc"  ];then
  FUNCTION="\#include \<sqlcpr.h\>"
 elif [ $FUNCTION = "strcat"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strchr"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strcmp"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strcpy"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strerror"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strftime"  ];then
  FUNCTION="\#include \<time.h\>"
 elif [ $FUNCTION = "strlen"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strncat"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strncmp"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "strncpy"  ];then
  FUNCTION="\#include \<string.h\>"
 elif [ $FUNCTION = "tolower"  ];then
  FUNCTION="\#include \<ctype.h\>"
 elif [ $FUNCTION = "unlink"  ];then
  FUNCTION="\#include \<stdio.h\>"
 fi

 if [ -f $PCFILE_NAME ];
 then
         grep -v "^[\/  ][      ]*" $PCFILE_NAME | grep -q "$FUNCTION"
 if [ $? -ne 0 ];
 then
       echo "$FUNCTION is not found in $PCFILE_NAME"
 fi
#	echo "FILE $PCFILE_NAME"
#	 grep "^[^ 	]$FUNCTION" $PCFILE_NAME
 else
         grep -v "^[\/  ][      ]*" $FILE_NAME | grep -q "$FUNCTION"
 if [ $? -ne 0 ];
 then
       echo "$FUNCTION is not found in $FILE_NAME"
 fi
#	echo "FILE $FILE_NAME"
#	 grep "^[^ 	]$FUNCTION" $FILE_NAME
 fi

done < "$INPUT_FILE"

