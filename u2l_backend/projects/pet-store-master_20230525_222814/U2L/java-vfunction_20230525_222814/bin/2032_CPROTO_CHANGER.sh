#!/usr/local/bin/bash
#
# $Header: /data/cvsrepo/assess-tools/bin/2032_CPROTO_CHANGER.sh,v 1.7 2013/12/20 07:20:00 morimoto Exp $
# $Name: rev_1_10 $
#
# ツール名 : 2032_CPROTO_CHANGER.sh
# 概要     : cprotoツール実行結果加工ツール
# 実行方法 : 2032_CPROTO_CHANGER.sh PLOG CPROTOOUT
# 入力	   : PLOG : プロトタイプに関する警告一覧(2030_getprotow.sh出力)
#	   : CPROTOOUT : cproto ツール実行結果ファイル
# 出力     : 以下のような"ファイル名@プロトタイプ宣言"をstdoutに出力
#		xxxx.c@foo(int, char *)
#		yyyy.c@sss(void)

#2223.sh,4241.sh,4142.sh Outputfile
INPUT_FILE=$1
CPROTO_FILE=$2

while read DATA;do

 FILE_NAME=`echo "$DATA" | awk ' { print $1 } ' `
 FUNCTION=`echo "$DATA" | awk ' { print $2 } ' `
 MOREDATA=`echo "$DATA" | awk ' { print $3 } ' `

 if [ -n "$MOREDATA" ];then
   echo "BADDATA: $DATA" >&2
   echo "Program terminated abnormally. Please remove BADDATA." >&2
   exit 1
 fi

 if [ "$FUNCTION" = "atoi"  ];then 
  FUNCTION="#include <stdlib.h>"
 elif [ "$FUNCTION" = "atol"  ];then
  FUNCTION="#include <stdlib.h>"
 elif [ "$FUNCTION" = "bzero"  ];then
  FUNCTION="#include <strings.h>"
 elif [ "$FUNCTION" = "ceil"  ];then
  FUNCTION="#include <math.h>"
 elif [ "$FUNCTION" = "close"  ];then
  FUNCTION="#include <unistd.h>"
 elif [ "$FUNCTION" = "free"  ];then
  FUNCTION="#include <stdlib.h>"
 elif [ "$FUNCTION" = "getpid"  ];then
  FUNCTION="#include <unistd.h>"
 elif [ "$FUNCTION" = "isalnum"  ];then
  FUNCTION="#include <ctype.h>"
 elif [ "$FUNCTION" = "isdigit"  ];then
  FUNCTION="#include <ctype.h>"
 elif [ "$FUNCTION" = "isspace"  ];then
  FUNCTION="#include <ctype.h>"
 elif [ "$FUNCTION" = "localtime"  ];then
  FUNCTION="#include <time.h>"
 elif [ "$FUNCTION" = "memcmp"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "memcpy"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "memset"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "read"  ];then
  FUNCTION="#include <unistd.h>"
 elif [ "$FUNCTION" = "sqlald"  ];then
  FUNCTION="#include <sqlcpr.h>"
 elif [ "$FUNCTION" = "sqlclu"  ];then
  FUNCTION="#include <sqlcpr.h>"
 elif [ "$FUNCTION" = "sqlglm"  ];then
  FUNCTION="#include <sqlcpr.h>"
 elif [ "$FUNCTION" = "sqlnul"  ];then
  FUNCTION="#include <sqlcpr.h>"
 elif [ "$FUNCTION" = "sqlprc"  ];then
  FUNCTION="#include <sqlcpr.h>"
 elif [ "$FUNCTION" = "strcat"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strchr"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strcmp"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strcpy"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strerror"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strftime"  ];then
  FUNCTION="#include <time.h>"
 elif [ "$FUNCTION" = "strlen"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strncat"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strncmp"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "strncpy"  ];then
  FUNCTION="#include <string.h>"
 elif [ "$FUNCTION" = "tolower"  ];then
  FUNCTION="#include <ctype.h>"
 elif [ "$FUNCTION" = "unlink"  ];then
  FUNCTION="#include <unistd.h>"
 elif [ "$FUNCTION" = "write"  ];then
  FUNCTION="#include <unistd.h>"

 else

 FUNCTION=`grep "[ |*]${FUNCTION}(" $CPROTO_FILE | grep -v "^/\*" `

 fi

 echo $FILE_NAME"@"$FUNCTION

done < "$INPUT_FILE"

