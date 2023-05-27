#
# $Header: /data/cvsrepo/assess-tools/bin/0003_cobstep.pl,v 1.2 2013/06/24 05:36:27 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 0003_cobstep.pl
# 概要     : COBOLの行数計算ツール
# 実行方法 : 0003_cobstep.pl file
# 入力	   : file : COBOLファイル
# 出力     : 行数結果
#
# PROCEDURE DIVISION以前の行数
$def_line = 0;
# PROCEDURE DIVISION以前のコメント行数
$def_comment_line = 0;
# PROCEDURE DIVISION以降の行数
$proc_line = 0;
# PROCEDURE DIVISION以降のコメント行数
$proc_comment_line = 0;
# PROCEDURE DIVISION以前/以降を判定するフラグ
$mode = 0;

open FILE, $ARGV[0];

while(<FILE>)
{
	# 7桁目が「*」かどうか調べる
	if(length($_) >= 7)
	{
		$is_comment = substr($_, 6, 1) eq "*";
	}

	# PROCEDURE DIVISIONが始まったかどうか調べる
	if($mode != 1 && $_ =~ /PROCEDURE DIVISION/i && !$is_comment)
	{
		$mode = 1;
	}

	# 各種カウントアップ
	if($mode)
	{
		if($is_comment)
		{
			$proc_comment_line++;
		}
		else
		{
			$proc_line++;
		}
	}
	else
	{
		if($is_comment)
		{
			$def_comment_line++;
		}
		else
		{
			$def_line++;
		}
	}
}

print "$ARGV[0],$def_line,$def_comment_line,$proc_line,$proc_comment_line\n";

close FILE;
