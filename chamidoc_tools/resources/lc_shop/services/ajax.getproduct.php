<?php

// ajax.getproduct.php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$cglobal = __DIR__.'/../../../../../main/inc/global.inc.php';
if (file_exists($cglobal)) {
	require_once __DIR__.'/../../../../../main/inc/global.inc.php';
} else {
	$cglobal =  __DIR__.'/../../../../../main/inc/global.inc.php';
	if (file_exists($cglobal)) {
		require_once __DIR__.'/../../../../../main/inc/global.inc.php';
	} else {
		echo "error";
		exit;
	}
}

if (file_exists(__DIR__."/../../../inc/functions.php")) {
    require_once(__DIR__."/../../../inc/functions.php");
} else {
    echo "error";
    exit;
}

$userId = api_get_user_id();

$action = isset($_GET['action']) ? Security::remove_XSS($_GET['action']) : 'prelev';

$itemproduct = isset($_GET['item']) ? Security::remove_XSS($_GET['item']) : 0;
$price = isset($_GET['pc']) ? Security::remove_XSS($_GET['pc']) : 1000;

if ($itemproduct!='') {
    
    $learningcoins = 0;

    if ($action=='prelev') {

        $learningcoins = getExtraFieldlearningcoinsCD($userId);
        $learningcoinsitemscoll = getExtraFieldItemsAvatarGlobalCD($userId);

        if (strpos($learningcoinsitemscoll,$itemproduct)===false) {

            if ($learningcoins>$price) {

                $learningcoins = $learningcoins - $price;
                $learningcoinsitemscoll = $learningcoinsitemscoll.$itemproduct.'_';
                setExtraFieldlearningcoinsCD($userId,$learningcoins);
                setExtraFieldItemsAvatarGlobalCD($userId,$learningcoinsitemscoll);
                echo 'OK';
    
            } else {
    
                echo 'KO';
            
            }
          

        } else {

            echo 'OK double';

        }

    }

}
