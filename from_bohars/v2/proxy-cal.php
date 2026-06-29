<?php
$url = 'https://calendar.google.com/calendar/ical/ab162583017a7f2d09eb9e93111b20cb6e946547f94687be7e66993ce2605548%40group.calendar.google.com/public/basic.ics';
header('Content-Type: text/calendar; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=3600');
readfile($url);