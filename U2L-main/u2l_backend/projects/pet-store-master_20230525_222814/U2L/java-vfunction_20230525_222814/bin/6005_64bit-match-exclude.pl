#!/usr/bin/perl
##
## $Header: /data/cvsrepo/assess-tools/bin/6005_64bit-match-exclude.pl,v 1.2 2013/07/28 08:51:50 kitayama Exp $
## $Name: rev_1_10 $
##
## ツール名 : 6005_64bit-match-exclude.pl
## 概要     : キーワード抽出内部ツール
## 実行方法 : 6005_64bit-match-exclude.pl $file 
##               $PJHOME/etc/64bit.match $PJHOME/etc/64bit.exclude
##                > 64bit_reportlog 2> excludes.log
## 入力     :
##               6000_64bit_report.shの内部から呼び出される
## 出力     :
##
##
#

my @patterns;
my @expatterns;

my $patfil = $ARGV[1];
# パターンのロード
open(IN,"<$patfil") || die "Can't open patten file $patfil";
my $cnt = 0;
while(<IN>) {
	chomp;
	if (/^[#]{2,}/) {	# Comment
		next;
	}
	$patterns[$cnt++] = $_;
}
close(IN);

$patfil = $ARGV[2];
# パターンのロード
open(IN,"<$patfil") || die "Can't open patten file $patfil";
$cnt = 0;
while(<IN>) {
	chomp;
	if (/^[#]{2,}/) {	# Comment
		next;
	}
	$expatterns[$cnt++] = $_;
}
close(IN);

open(my $fh, "$ARGV[0]") || die "Can't open \"$ARGV[0]\"";

while(<$fh>) {
	my $filename = $_;
	chomp($filename);
	open(my $cfh, "$filename") || die "Can't open $filename";
	while(<$cfh>) {
		my $org = $_;
		my $substr=$org;
		for(my $i=0; $i <= $#expatterns; $i++) {
			my $expat = $expatterns[$i];
			# 除外パターンがあればその部分を削除
			if ( $substr =~ /$expat/) {  
				$substr =~ s/$expat//g;
				print STDERR "Match $expat ($i) Str : $org";
			}
		}
		# 指定パターンマッチング
		for(my $i=0; $i <= $#patterns; $i++) {
			my $pat = $patterns[$i];
			#print "Pattern $pat\n";
			# 1つでも見つかったらその行を出力
			if ( $substr =~ /$pat/) {  
				print "$filename:$.:$org";
				last;
			}
		}
	}
	close($cfh);
}
close($fh);

