#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1000_changemk.sh,v 1.3 2013/06/26 08:49:15 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1000_changemk.sh
# 概要     : Makefile のオプションを置換
# 実行方法 : 1000_changemk.sh Makefile_list
# 入力	   : Makefile_list : Makefileリスト
# 出力     : なし (NEWPATH ディレクトリに置換後の Makefile を作成)

if [ $# -ne 1 ];
then
	echo "Usage : $0 <Makefile_list>"
	exit 1
fi

if [ -f $1 ];
then
	MAKEFILELIST=$1
else
	echo "Not found $1"
fi
	
#  HP_MOD コメント
TEMPLATE1="\ HP_MOD\ \:\ ME-06\ "
TEMPLATE2="\:\ `date +%Y\.%m\.%d`"

# 置換されたファイルを NEWPATH で指定したディレクトリに保存
NEWPATH=./new

# ログファイル名
log=log`LANG=C date '+%m%d%H%M'`

echo "Starting Time : \c" >> $log
date >> $log

# 
for SRCFILE in `cat $MAKEFILELIST`
do
  cat $SRCFILE |\
   if grep '^LDFLAGS' > /dev/null
   then
#	echo `date +%y%m%d%H%M%S` Change start $SRCFILE
	# 以下の行を適時修正
	cat $SRCFILE | \
	sed -e "/^LDFLAGS/i ###${TEMPLATE1}${TEMPLATE2}" |\
	sed -e "s/^\([ 	]*\)\-Bdynamic/\1\-dynamic/g" > $NEWPATH/$SRCFILE
   else
	cp $SRCFILE $NEWPATH
 fi 
#	echo `date +%y%m%d%H%M%S` Change end $SRCFILE
done
echo "Finished Time : \c" >> $log
date >> $log
