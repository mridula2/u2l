#!/usr/bin/perl
#
## $Header: /data/cvsrepo/assess-tools/bin/line_add.pl,v 1.1 2013/08/02 03:08:19 kitayama Exp $
##
#

sub add_sentense
{
	my ($filename, $line) = @_;
	my $lbu=0;
	my $rbu=0;
	my $sep="	";
	my $rstr;

	open(my $fh, "$filename") || die "Can't open $filename";
	my $str="";
	while(<$fh>) {
		next if ( $. < $line );
		chomp;
		s/^\s+//;
		s/	/ /g;
		$str .= $_;
		$lbu = (() = $str =~ /\(/g);
		$rbu = (() = $str =~ /\)/g);
		if ( $lbu == $rbu || $str =~ /\|\|\s*$/ || $str =~ /.*{\s*$/ || $a[3] =~ /\&\&\s*$/ ) {
			$rstr="$str\n"; 	
			last;
		}
	}
	close($fh);

	return $rstr;
}
1;
