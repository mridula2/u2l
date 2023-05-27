#!/bin/sh
#
# $Header: /data/cvsrepo/assess-tools/bin/1026_compiled-filecount.sh,v 1.2 2013/06/25 08:15:15 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1026_compiled-filecount.sh
# 概要     : 指定されたディレクトリにある.oファイルの数をカウントする
# 実行方法 : 1026_compiled-filecount.sh c_files.out noncompile
# 入力     : c_files.out    : .c,.pc のファイルリスト
#          : noncompile     : コンパイルしない .c,.pc ファイル
# 出力     : オブジェクトファイルが生成されていない .c, .pc ファイル名
#          : 最後に総ファイル数とオブジェクトファイル数が出力される

typeset -i total=0
typeset -i num=0
typeset -i unnum=0
typeset -i noncompile=0

if [ $# -ne 2 ];
then
	echo "Usage $0 c_files.out noncompie_list"
	exit 1
fi

if [ ! -f $1 ];
then
	echo "Not found $1"
	exit 1
fi

if [ ! -f $2 ];
then
	echo "Not found $2"
	exit 1
else
	noncompile_file=$2
fi

while read cfile 
do
        # 指定されたソースファイルがなければ終了
        if [ ! -f $cfile ];
        then
                echo "Not found source file : $cfile"
                exit 1
        fi
	objname=`echo $cfile | sed -n '/\.h$/!p' | sed -e 's/\.pc$/.o/' -e 's/\.c$/.o/'`
	if [ "$objname" != "" ];
	then
		total=`expr $total + 1`
		#if [ "`find . -name $objname`" = "" ];
		if [ ! -f $objname ];
		then
			cfilereg=`echo $cfile | sed 's/\//\\\\\//g'`
			grep -q "$cfilereg" $noncompile_file
			if [ $? -ne 0 ];
			then
				echo $cfile
				noncompile=`expr $noncompile + 1`
			else
				#echo $cfile
				unnum=`expr $unnum + 1`
			fi
		else
			num=`expr $num + 1`
		fi
	fi
done < $1

echo "Not compiled file : $noncompile"
echo "Total object file : $num"
echo "Known uncompiled file : $unnum"
echo "Total file : $total"
