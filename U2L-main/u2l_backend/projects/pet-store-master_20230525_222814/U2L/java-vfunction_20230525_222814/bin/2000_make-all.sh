#!/bin/sh

$PJHOME/bin/make_01.sh &
$PJHOME/bin/make_02.sh &
$PJHOME/bin/make_03.sh &
wait
$PJHOME/bin/make_04.sh &
