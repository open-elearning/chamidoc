<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/../../main/inc/global.inc.php';
require_once __DIR__."/inc/functions.php" ;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$ctrMigrationChamidoc = api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/migration202405.txt';

$cacheDir = api_get_path(SYS_APP_PATH).'upload/rendercache/';
if (!file_exists($cacheDir)) {
    mkdir($cacheDir, 0777, true);
}
$cacheDir1 = api_get_path(SYS_APP_PATH).'upload/rendercache/creditjetons/';
if (!file_exists($cacheDir1)) {
    mkdir($cacheDir1, 0777, true);
}
$cacheDir2 = api_get_path(SYS_APP_PATH).'upload/rendercache/gainjetons/';
if (!file_exists($cacheDir2)) {
    mkdir($cacheDir2, 0777, true);
}
$cacheDir3 = api_get_path(SYS_APP_PATH).'upload/rendercache/h5pplay/';
if (!file_exists($cacheDir3)) {
    mkdir($cacheDir3, 0777, true);
}
$cacheDir4 = api_get_path(SYS_APP_PATH).'upload/rendercache/htmlpresenter/';
if (!file_exists($cacheDir4)) {
    mkdir($cacheDir4, 0777, true);
}
$cacheDir5 = api_get_path(SYS_APP_PATH).'upload/rendercache/import-package/';
if (!file_exists($cacheDir5)) {
    mkdir($cacheDir5, 0777, true);
}
$cacheDir6 = api_get_path(SYS_APP_PATH).'upload/rendercache/adv-oel-convert/';
if (!file_exists($cacheDir6)) {
    mkdir($cacheDir6, 0777, true);
}

$loopMigration = 0;

$ctrtools1 = api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools/resources/js/lc_chamilo_s_tools_ui.js';
$ctrtools2 = api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools/resources/js/chalkboard_tools_ui.js';

if (file_exists($ctrtools1)) {
    recurseCopyMigrationChamidoc(api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools/rendercache',api_get_path(SYS_APP_PATH).'upload/rendercache/',$loopMigration);
}
$ctrtools3 = api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/rendercache';
if (file_exists($ctrtools3)&&$loopMigration == 0) {
    recurseCopyMigrationChamidoc(api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/rendercache',api_get_path(SYS_APP_PATH).'upload/rendercache/',$loopMigration);
}

if ($loopMigration == 0) {
    // MIGRATION 2024
    $faketoolschalkboard = api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools';
    if (!file_exists($faketoolschalkboard)) {
        mkdir($faketoolschalkboard, 0777, true);
    }
    $faketoolschalkboardresources = api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools/resources';
    if (!file_exists($faketoolschalkboardresources)) {
        mkdir($faketoolschalkboardresources, 0777, true);
    }
    $faketoolschalkboardjs = api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools/resources/js';
    if (!file_exists($faketoolschalkboardjs)) {
        mkdir($faketoolschalkboardjs, 0777, true);
    }
    $faketoolschalkboardcss = api_get_path(SYS_PLUGIN_PATH).'chalkboard_tools/resources/css';
    if (!file_exists($faketoolschalkboardcss)) {
        mkdir($faketoolschalkboardcss, 0777, true);
    }
    // Retro compatibility
    $copyFileChalk = $faketoolschalkboardjs.'/jquery.min.js';
    if (!file_exists($copyFileChalk)) {
        @copy(api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/resources/js/jquery.min.js',$copyFileChalk);
    }
    $copyFileChalk = $faketoolschalkboardjs.'/chalkboardtools.js';
    if (!file_exists($copyFileChalk)) {
        @copy(api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/resources/js/chalkboardtools.js',$copyFileChalk);
    }
    $copyFileChalk = $faketoolschalkboardcss.'/chalkboardtools.css';
    if (!file_exists($copyFileChalk)) {
        @copy(api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/resources/css/chalkboardtools.css',$copyFileChalk);
    }
    // Retro compatibility

    @unlink($ctrtools1);
    @unlink($ctrtools2);

    if (!file_exists($ctrtools1)) {

        $fd = fopen($ctrMigrationChamidoc,'w');	
        fwrite($fd,'1');
        fclose($fd);
    }
    echo "<p style='color:green;' >Migration Chamidoc Tools done</p>";
    
} else {
    echo "<ul>";
    echo "<li>Migration Chamidoc Tools process ...</li>";
    echo "<li>PLEASE WAIT !</li>";
    echo "</ul>";
    echo "<script>setTimeout(function(){ location.href = 'migration.php'; }, 2000);</script>";

}

?>