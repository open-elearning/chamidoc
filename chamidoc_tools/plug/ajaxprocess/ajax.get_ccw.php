<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$cglobal = __DIR__.'/../../../../main/inc/global.inc.php';
if (file_exists($cglobal)) {
	require_once __DIR__.'/../../../../main/inc/global.inc.php';
} else {
	$cglobal =  __DIR__.'/../../../../main/inc/global.inc.php';
	if (file_exists($cglobal)) {
		require_once __DIR__.'/../../../../main/inc/global.inc.php';
	} else {
		echo "error";
		exit;
	}
}

if (file_exists(__DIR__."/../../inc/functions.php")) {
    require_once(__DIR__."/../../inc/functions.php");
} else {
    echo "error";
    exit;
}

$userId = api_get_user_id();

$item_id = isset($_GET['item_id']) ? Security::remove_XSS($_GET['item_id']) : 0;
$lp_id = isset($_GET['lp_id']) ? Security::remove_XSS($_GET['lp_id']) : 0;
$session_id = isset($_GET['session_id']) ? Security::remove_XSS($_GET['session_id']) : 0;

if ($item_id!=0) {

    $learningcoins = getExtraFieldlearningcoinsCD($userId);

    if ($learningcoins!='') {
        echo $learningcoins;
    }
    
} else {
    echo '0';
}
