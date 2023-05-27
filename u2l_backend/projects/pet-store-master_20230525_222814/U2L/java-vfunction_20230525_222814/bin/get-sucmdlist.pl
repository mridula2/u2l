#!/usr/bin/perl
#
# $Header: /data/cvsrepo/assess-tools/bin/get-sucmdlist.pl,v 1.1 2014/11/30 23:22:15 hmizuno Exp $
# $Name: rev_1_10 $
#
# get command name in su command argument
#
#   usage :
#     get-sucmdlist.pl filename_list_file
#
#       format of filename_list_file :
#           filename1
#           filename2
#               :
#
#   example of su command which this script detects: 
#
#	su - ${USER} -c "/usr/bin/sh"
#	su - ${MQ_USER} "/usr/bin/sh ${MQ_CON_SCRIPT_PATH} ${MQ_NAME} strall"
#

use File::Basename;

my $filename=$ARGV[0];

sub mydie
{
	printf( STDERR "ERROR: %s\n", @_ );
	printf( STDERR "Usage : %s filename_list_file\n", basename( $0 ) );
	exit 1;
}

if ( $filename eq "" ) {
	mydie( "specify filename list file!" );
}

open(my $flist, "$filename") || mydie( "Can't open $filename" );

sub mklist
{
	(my $fname) = @_;
	(my $lineno) = 0;

	open(my $fh, "$fname") || die("Can't open $fname (listed in $filename)");

	while(<$fh>) {
		$lineno++;

		chomp( $_ );
		$nowline = $_;

		s/#.*//; # delete commnet block

		if ( /\Wsu\W/ ) {
		# su command
		# printf( "C\tCSUALL\t$_\t$fname\n" );
			my $cmd;
			if ( /-c/ ) {
			# su ... -c command format
				s/.*\Wsu\s.*\s-c\s//;
				my @a = split();
				$cmd = $a[0];
			} else {
			# su - arg1 commmand format
				s/.*\Wsu\s[-]//;
				my @a = split();
				$cmd = $a[1];
			}
			$cmd =~ s/"//g;
			$cmd =~ s/'//g;
			printf( "C\t%s\t%s\t\t%s\t%d\t%s\n", "CMDSU", $cmd, $fname, $lineno, $nowline );
			
		}
	}
}

while(<$flist>) {
#	print "$. $_ ";
	chomp( $_ );
	my $fname = $_;
	mklist $fname;
}
close($flist);
