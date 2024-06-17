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

$action = isset($_GET['action']) ? Security::remove_XSS($_GET['action']) : 'prelev';

$item_id = isset($_GET['item_id']) ? Security::remove_XSS($_GET['item_id']) : 0;
$lp_id = isset($_GET['lp_id']) ? Security::remove_XSS($_GET['lp_id']) : 0;
$session_id = isset($_GET['session_id']) ? Security::remove_XSS($_GET['session_id']) : 0;
$price = isset($_GET['pc']) ? Security::remove_XSS($_GET['pc']) : 1000;
$renderPath = getPathRenderCacheChamiDoc();

if ($item_id!=0) {
    
    $learningcoins = 0;

    if ($action=='prelev') {
        $learningcoins = getExtraFieldlearningcoinsCD($userId);
    }

    $jetonName = $userId.'_'.$lp_id.'_'.$item_id.'_'.$session_id.'.txt';
    $jetonKey = $renderPath.'creditjetons/'.$jetonName;
    $pathJeton = $renderPath.'creditjetons/'.$jetonName;

    if(!file_exists($renderPath.'creditjetons/')){
        @mkdir($renderPath.'creditjetons/','0777');
    }
    
    $haveDelayCal = false;

    if ($action=='prelev') {

        if(!file_exists($pathJeton)){

            if ($learningcoins>$price) {

                    $learningcoins = $learningcoins - $price;

                    setExtraFieldlearningcoinsCD($userId,$learningcoins);
                    
                    $fd = fopen($jetonKey,'w');	
                    fwrite($fd,'1');
                    fclose($fd);
            
                    echo 'OKnc';

                } else {
                    echo 'KO';
                }

        } else {
            $haveDelayCal = true;
        }
}

    if ($haveDelayCal||$action=='control') {

        if(file_exists($pathJeton)){
            //echo ' pathJeton : '.$pathJeton ;
            //filemtime filectime
            $delay = intval(time()) - intval(filemtime($pathJeton));
            //echo ' time : '.intval(time());
            //echo ' filectime : '.intval(filectime($path.'/'.$jetonKey));
            $nbh = 1;
            if($delay > (3600*$nbh)){
                @unlink($jetonKey);
                if(!file_exists($cglobal)){
                    echo ' KOfinish ';
                } else {
                    echo ' KOfinish ';
                }
            } else {
                echo 'DELAY:'.intval((3600*$nbh) - $delay);
            }
            
        }
    }

}
