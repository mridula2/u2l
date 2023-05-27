#!/usr/bin/perl
#
# $Header: /data/cvsrepo/assess-tools/bin/4001_scandetail_getsrc.pl,v 1.2 2015/01/09 02:09:10 meguro Exp $
#
# ツール名 : 4001_scandetail_getsrc.pl
# 概要     : scanditail の出力結果を元に詳細レポートのフォーマットで調査対象箇所を出力する
# 実行方法 : 5001_exec_getsrc file1
# 入力     : file1 : scandetailの実行結果ファイル
# 出力     : scandetail_check_lists : 詳細レポート形式のファイル

#
use strict;
use warnings;
use Time::Local;

require "$ENV{PJHOME}/bin/line_add.pl";

#  File Name
my $file;
if ( $#ARGV != 0 ) {
	die "Usage : $0 file.\n";
}
else {
	$file="$ARGV[0]";
}
my $dpath;
my $tfile;
my $total = 0;
my $sumlist="sum_list";
my %ids;

open(my $fdid, "$sumlist") || die("Can't open \"$sumlist\"");
while(<$fdid>) {
	if ( /(.*)\t(.*)/ ) {
		my $id = $1;
		my $msg = $2;
		$msg =~ s/^  //;
		$ids{$msg} = $id;
#		print "$msg\t$ids{$msg}\n";
	}
}
close($fdid);
	
open(my $fd, "$file") || die("Can't open \"$file\"");
open(my $fd2, "> scandetail_check_lists") || die("Can't open $file");

while(<$fd>) {
        next if ( /^\s+$/ );
        if ( /Directory path: (.*)/ ) {
                $dpath = $1;
        }
        #
        # file name:line number: (Identifier type)problem synopsis (synopsis ID)
        #
        if ( /^([^: ]+):([0-9]+):(.*)/ ) {
                $tfile = $1;
                my $lnum = $2;
                my $synopsis = $3;
		$synopsis =~ s/^\s+//;
		$synopsis =~ s/^\**\([FHIM]\)//;
		my $stkid;
		$stkid = $ids{$synopsis};
#		print "$synopsis\t$stkid\n";
		if ( $stkid eq "" ) {
			$stkid = $synopsis;
		}
		my $str = &add_sentense($dpath . $tfile, $lnum);	
		if ( ! defined($str) ) {
			print STDERR "NOT FOUND : $tfile : $lnum : $stkid : $synopsis\n";
			$str = "########## ERROR ##########\n";
		}
		print $fd2 "$stkid\t$tfile\t$lnum\t$str";
		$total++;
        }
}

close($fd);
close($fd2);

print "Total number : $total\n"; 
