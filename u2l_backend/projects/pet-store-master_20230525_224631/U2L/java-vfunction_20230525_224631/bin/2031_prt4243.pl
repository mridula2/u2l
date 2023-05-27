#!/usr/bin/perl
#
# $Header: /data/cvsrepo/assess-tools/bin/2031_prt4243.pl,v 1.2 2013/06/24 05:36:28 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 2031_prt4243.pl
# 概要     : 警告番号4243の抽出ツール
# 実行方法 : 2031_prt4243.pl FILE
# 入力	   : FILE : CAログファイル
# 出力     : 警告番号4243の警告を標準出力

open(my $fh, "$ARGV[0]") || die("Can't open $ARGV[0]");

while(<$fh>) {
    s/  /    /g;
    if ( /"(.*)", (line [0-9]+): remark \#4243-D: function declared with empty parentheses, consider replacing with a prototype/ ) {
        my $fn = $1;
        my $ln = $2;
        print "$fn\t";
        $print_ok = 1;
    }
    elsif ( $print_ok ) {
	s/extern\s+//;
	s/static\s+//;
	s/int\s+//;
	s/long\s+//;
        if ( /^\s+(.*)\s*\(\s*\)\s*;/ ) {
		my $funcname = $1;
		print" $funcname\n";
		$print_ok = 0;
	}
	else {
		print "ERROR: $_";
	}
    }

}
close($fh);
