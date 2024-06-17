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

$action = isset($_GET['action']) ? Security::remove_XSS($_GET['action']) : 'gainlcoin';

$item_id = isset($_GET['item_id']) ? Security::remove_XSS($_GET['item_id']) : 0;
$lp_id = isset($_GET['lp_id']) ? Security::remove_XSS($_GET['lp_id']) : 0;
$session_id = isset($_GET['session_id']) ? Security::remove_XSS($_GET['session_id']) : 0;
$price = isset($_GET['pc']) ? Security::remove_XSS($_GET['pc']) : 1000;
$renderPath = getPathRenderCacheChamiDoc();

if ($item_id!=0&&$price<11) {
    
    $learningcoins = 0;

    if ($action=='gainlcoin') {
        $learningcoins = getExtraFieldlearningcoinsCD($userId);
    }

    if(!file_exists($renderPath.'gainjetons/')){
        @mkdir($renderPath.'gainjetons/','0777');
    }

    $jetonName = $userId.'_'.$lp_id.'_'.$item_id.'_'.$session_id.'.txt';
    $jetonKey = $renderPath.'gainjetons/get_'.$jetonName;
    $pathJetonGet = $renderPath.'gainjetons/get_'.$jetonName;
    
    $haveDelayCal = false;

    if ($action=='gainlcoin') {

        if (!file_exists($pathJetonGet)) {

            $learningcoins = $learningcoins + $price;

            setExtraFieldlearningcoinsCD($userId,$learningcoins);
            
            $fd = fopen($jetonKey,'w');	
            fwrite($fd,'1');
            fclose($fd);
    
            echo ' OK';

        } else {

            echo ' KO';
        
        }

    } else {
        
        if ($action=='controlcoin') {
            if (file_exists($pathJetonGet)) {
                echo 'exitsOk';
            }
        }

    }

} else {
    echo ' KO';
}
