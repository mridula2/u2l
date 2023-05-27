#!/usr/bin/perl
#
# $Header: /data/cvsrepo/assess-tools/bin/3021_ca-erase.sh,v 1.2 2013/06/24 05:36:29 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 3021_ca-erase.sh
# 概要     : gcc と CA で重複する警告を削除するツール
# 実行方法 : 3021_ca-erase.sh ca_log cw_log
# 入力	   : ca_log : CAコンパイルログ
#	   : cw_log : gccコンパイルログ
# 出力     : 

sub check_warning
{
	(my $calog, $cwcmt) = @_;

	open(my $fh2, "$ARGV[1]") || die "Can't open $ARGV[1]";
	while(<$fh2>) {
		if ( /$cwcmt/ ) {
			my @a = split(/	/, $calog);
			my @b = split(/	/, $_);
			if (( $a[0] eq $b[0])  && ($a[5] eq $b[5])) {
				return 1;
			}
		}
	}
	close($fh2);

	return 0;
}
1;

#
# Main
#
if ( $#ARGV != 1 ) {
	print STDERR "Usage : $0 <ca-log> <cw-log>\n";
	exit 1;
}

open(my $fh, "$ARGV[0]") || die "Can't open $ARGV[0]";

while(<$fh>) {
	my $cont = $_;
	my $wid;
	if ( /(\#[0-9]+-D)/ ) {
		$wid = $1;
	}
	if ( $wid ne "" ) {
		my $ret = check_warning($_, $wid);
		if ( $ret == 0 ) {
			print "$cont";
		}
		else {
			print STDERR "DELETE: $cont";
		}
	}
	else {
		print "No ID : $_\n";
		exit 1;
	}
}

close($fh);
