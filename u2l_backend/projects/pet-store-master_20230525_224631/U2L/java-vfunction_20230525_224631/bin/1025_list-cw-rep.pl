#!/usr/bin/perl
#
# $Header: /data/cvsrepo/assess-tools/bin/1025_list-cw-rep.pl,v 1.3 2013/06/24 05:36:28 miya Exp $
# $Name: rev_1_10 $
#
# ツール名 : 1025_list-cw-rep.pl
# 概要     : gccコンパイル警告ID付加スクリプト
# 実行方法 : 1025_list-cw-rep.pl log
# 入力	   : log : gcc コンパイルログファイル
#		xxx.c:62: warning: unused variable 'i'
# 出力     : 警告IDをつけた警告メッセージ
#		xxx.c:62: remark #G2177: unused variable 'XXXX'

use warnings;
use strict;

# ID とメッセージとの対応データ
my $datafile="$ENV{PJHOME}/etc/gcc-wreport.data";
my %wdata;
my %regdata;
my %cont;
my @ids;

# Read gcc warning message data file.
open my $fh1, "$datafile" || die("Can't open $ARGV[0]");
while(<$fh1>) {
	chomp;
	next if ( /^\#/ );  # skip comment
	if ( /^([0-9-]+)\t(.*)\t([0-9])/ ) {
		my $id = $1;
		$wdata{$1} = $2;
		$cont{$1} = $3;
		push(@ids, $id);
#		print "$1\t$2\n";
		$regdata{$id} = $2;
		$regdata{$id} =~ s/\\/\\\\/g;
		$regdata{$id} =~ s/\#/\\\#/g;
		$regdata{$id} =~ s/\&/\\\&/g;
		$regdata{$id} =~ s/\|/\\\|/g;
		$regdata{$id} =~ s/\//\\\//g;
		$regdata{$id} =~ s/\*/\\\*/g;
		$regdata{$id} =~ s/\(/\\\(/g;
		$regdata{$id} =~ s/\)/\\\)/g;
		$regdata{$id} =~ s/ X / \\d\+ /g;
		$regdata{$id} =~ s/'X'/'\\S'/g;
		$regdata{$id} =~ s/ X\\\)/ \\d\+\\)/g;
		$regdata{$id} =~ s/XXXX/[\\S<>, ()_*]+/g;
	}
	else {
		print "Incorrect format in $. ($datafile)\n";
		exit 1;
	}
}
close($fh1);

if ( $#ARGV != 0 ) {
	print "Usage : $0 log\n";
	exit 1
}

if ( ! ( defined($ARGV[0]) || -f "$ARGV[0]" ) ) {
	print "Not found $ARGV[0]\"\n";
	exit 1
}

open my $fh, "$ARGV[0]" || die("Can't open $ARGV[0]");

my $wcount=0;
while(<$fh>) {
	if ( /^(.*:[0-9]+:)\s+warning:(.*)/ ) {
	     my $wfile = $1;
	     my $wmsg = $2;
	     my $found = 0;
	     $wmsg =~ s/^\s+//;
	     my $num = 0;
	     foreach my $wid (@ids) {
		if ( $wmsg =~ /^$regdata{$wid}/ ) {
			$found = 1;
			$wcount = $cont{$wid};
			if ( $wfile =~ /(.*:[0-9]+:)[0-9]+:/ ) {
				$wfile = $1;
			}
			my $wout = $wid;
			if ( $wid =~ /(\d+)-/ ) {
				$wout = $1;
			}
			if ( $wid =~ /-2/ ) {
				print "$wfile remark \#G$wout: $wdata{$wid}\n";
			}
			else {
				print "$wfile warning \#G$wout: $wdata{$wid}\n";
			}
			last;
		}
	    }
	    if ( $found == 0 ) {
#		    print "CON $wcount\n";
		if ( $wcount > 0 ) {
			$wcount--;
			next;
		}
		else {
			print STDERR "Error: Not found \"$wmsg\" ($.)\n";
			exit 1;
		}
	    }
	}
}

close($fh);

