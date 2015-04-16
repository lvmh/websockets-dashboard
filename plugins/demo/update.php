<?php

require_once(dirname(dirname(__FILE__)).'/lib.php');
#require_once(dirname(__FILE__).'/config.php');

// Verbose
$v = false;
function debug($message) {
    global $v;
    if (!empty($v)) {
        echo "$message\n";
    }
}

// Last dataset hash
$lasthash = '';
$lastcodes = array();
$laststates = array();

while (1) {

    print "API call\n";
    $data = rand(0,9);

    dashboard_push_data('demo', array('lastchange' => time(), 'data' => $data));
    print "Update sent\n";
    print "Press enter to continue\n";
    $input = fread(STDIN, 10000);

}
