#!/usr/bin/perl
#
# $Header: /data/cvsrepo/assess-tools/bin/6004_exclude.pl,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 6004_exclude.pl
# 概要     : キーワード抽出スクリプト
# 実行方法 : 6004_exclude.pl <抽出キーワード>ファイル名
# 入力	   : 
#		抽出キーワードはファイルで指定する
#		抽出キーワードのフォーマットは1行1抽出パターンを書く形となる
#		抽出対象はstdinなので、パイプ等を使用して抽出を行う
# 出力     : 
#
#
local $patfil = $ARGV[0];
# パターンのロード
local @patterns;
open(IN,"<$patfil") || die "Can't open patten file $patfil";
local $cnt = 0;
local $substr = "";
while(<IN>) {
	chomp;
	if (/^[#]{2,}/) {
		next;
	}
	$patterns[$cnt++] = $_;
}
close(IN);
# 各行に対する処理
open(OUT,">excludes.log");
while(<STDIN>) {
	# 2つめの:以降を絞り込み対象とする
	$pos = &getcolpos($_,":",2);
	$substr = substr($_,$pos);
	# 指定パターンマッチング
	local $found = 0;
	for(local $i=0; $i < @patterns; $i++) {
		local $pat = $patterns[$i];
		if ($substr =~ /$pat/) {	# 1つでも見つかったら無視
			$found = 1;
			last;
		}
	}
	if (!$found) {
		print $_;
	}
}
#
#	文字列からn番目の指定文字列を検索してそのindexを返す
#		コーリングシーケンス
#			$idx = getcolpos($str,$find,$findpos);
#		引数
#			$str	:	検索対象
#			$find	:	検索する文字列
#			$findpos:	n番目
#		戻り値
#			見つかったindex+1
sub getcolpos {
	local ($str,$find,$findpos) = @_;
	local $cnt = 0;
	local $i=0;
	local $len=length($str);
	# 文字列長を超えない限り
	for($i=0; $i < $len; ) {
		# $i番目から指定文字列を検索
		$i = index($str,$find,$i);
		# 見つからなかったのでループを抜ける
		if ($i == -1) {
			last;
		}
		# 次の検索ポジションを得る
		$i++;
		$cnt++;
		# 指定数見つかったらループを抜ける
		if ($cnt >= $findpos) {
			last;
		}
	}
	# 見つからなかったら0を返す
	if ($i == -1) {
		return 0;
	} else {
		return $i;
	}
}
