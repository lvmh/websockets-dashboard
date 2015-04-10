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

    dashboard_push_data('moodleversion', array('lastchange' => time(), 'groups' => $codes, 'states' => $states, 'markup' => $details));
    print "Update sent\n";


    print "Sleeping...\n";
    sleep(30);
}
