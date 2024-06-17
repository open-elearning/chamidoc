<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$cglobal = __DIR__.'/../../../../main/inc/global.inc.php';
if(file_exists($cglobal)){
	require_once __DIR__.'/../../../../main/inc/global.inc.php';
}else{
	$cglobal =  __DIR__.'/../../../../main/inc/global.inc.php';
	if(file_exists($cglobal)){
		require_once __DIR__.'/../../../../main/inc/global.inc.php';
	}else{
		echo "error";
		exit;
	}
}

$userId = api_get_user_id();

$item_id = isset($_GET['item_id']) ? Security::remove_XSS($_GET['item_id']) : 0;
$lp_id = isset($_GET['lp_id']) ? Security::remove_XSS($_GET['lp_id']) : 0;
$session_id = isset($_GET['session_id']) ? Security::remove_XSS($_GET['session_id']) : 0;
$timesend = isset($_GET['timesend']) ? Security::remove_XSS($_GET['timesend']) : '';

if ($timesend!='') {

    $lpviewid = 0;

    $sqlview  = " SELECT c_lp_view.id as idview ";
    $sqlview .= " FROM c_lp_view WHERE c_lp_view.user_id = $userId  ";
    $sqlview .= " AND c_lp_view.lp_id = $lp_id AND session_id = $session_id";
    
    $resultLps = Database::query($sqlview);
    while ($row = Database::fetch_array($resultLps)) {
        $lpviewid = $row['idview'];
    }

    if ($lpviewid!=0) {

        if ($timesend=='5m') {$timeItem = 5 * 60; }
        if ($timesend=='15m') {$timeItem = 15 * 60;}
        if ($timesend=='20m') {$timeItem = 20 * 60;}
        if ($timesend=='30m') {$timeItem = 30 * 60;}
        if ($timesend=='45m') {$timeItem = 45 * 60;}
        if ($timesend=='60m') {$timeItem = 60 * 60;}
        if ($timesend=='75m') { $timeItem = 75 * 60;}
        if ($timesend=='90m') {$timeItem = 90 * 60;}
        if ($timesend=='105m') {$timeItem = 105 * 60;}
        if ($timesend=='120m') {$timeItem = 120 * 60;}
        if ($timesend=='135m') { $timeItem = 135 * 60;}
        if ($timesend=='150m') { $timeItem = 150 * 60;}
        if ($timesend=='165m') { $timeItem = 165 * 60;}
        if ($timesend=='180m') { $timeItem = 180 * 60;}
        if ($timesend=='195m') { $timeItem = 195 * 60;}
        if ($timesend=='210m') { $timeItem = 210 * 60;}

        $sqlUpt = " UPDATE c_lp_item_view SET total_time = $timeItem WHERE total_time < $timeItem AND lp_item_id = $item_id AND lp_view_id = $lpviewid;";
        Database::query($sqlUpt);
        echo 'OK';
    } else {
        echo 'KO !!';
    }
    
} else {
    echo 'KO !';
}
