<?php

// ini_set('display_errors',1);
// ini_set('display_startup_errors',1);
// error_reporting(E_ALL);

// @package chamilo.plugin.chamidoc_tools

$legacy = '';
if (file_exists(api_get_path(SYS_PATH).'/vendor/barryvdh/elfinder-builds/js/elfinder.full.js')) {
	$legacy = '1.11.2';
}

$version = '?v=40';

if (file_exists(__DIR__."/chamidoc_tools.php")) {
	require_once(__DIR__."/chamidoc_tools.php");
	$plugin_info = chamidoc_tools::create()->get_info();
	if (file_exists(__DIR__."/inc/functions.php")) {
		require_once(__DIR__."/inc/functions.php");
	}
}

$parsedUrl = parse_url($_SERVER['REQUEST_URI']);
$parsedUrlpathCtr = $parsedUrl['path'];
$posCtr = strrpos($parsedUrlpathCtr,"lp_controller.php");

$fh = '';

if ($legacy=='1.11.2') {
	$fh .= '<script type="text/javascript" >';
	$fh .= "console.log('legacy 1.11.2 :-| chamidoc Tools');";
	$fh .= "var _p = {";
	$fh .= "'web' : '".api_get_path(WEB_PATH)."',";
	$fh .= "'web_plugin' : '".api_get_path(WEB_PLUGIN_PATH)."',";
	$fh .= "'web_main' : '".api_get_path(WEB_PATH)."/main/',";
	$fh .= "'chamiloversion' : '1.11.2' ";
	$fh .= "};";
	$fh .= '</script>';
} else {
	$fh .= '<script type="text/javascript" >';
	$fh .= "_p['chamiloversion'] = '1.11.x';";
	$fh .= '</script>';
}

if ($posCtr===false) {
	
	$fh .= '';

} else {

	$ctrAction = isset($_GET['action']) ? (string) $_GET['action']:'';
	$ctrLpId = isset($_GET['lp_id']) ? (string) $_GET['lp_id']:-1;
	$ctrItId = isset($_GET['id']) ? (string) $_GET['id']:-1;
	$ctrPathItem= isset($_GET['path_item']) ? (string) $_GET['path_item']:-1;

	if ($ctrLpId!=-1){
		$_SESSION['ctrLpId'] = $ctrLpId;
	}
	
	$pwp = api_get_path(WEB_PLUGIN_PATH) . 'chamidoc_tools/resources/';

	if ($ctrAction!='edit_item'||$ctrAction!='add_item') {
		
		$fh .= '<script src="'.$pwp.'js/chamidoc_tools_ui.js'.$version.'" ';
		$fh .= ' type="text/javascript" ></script>';
		
		if ($legacy=='1.11.2') {
			$fh .= '<script type="text/javascript" src="'.api_get_path(WEB_PATH).'vendor/barryvdh/elfinder-builds/js/elfinder.full.js"></script>';
			$fh .= '<link rel="stylesheet" type="text/css" href="'.api_get_path(WEB_PATH).'vendor/barryvdh/elfinder-builds/css/elfinder.full.css">';
			$fh .= '<script type="text/javascript" src="'.api_get_path(WEB_PATH).'web/assets/jquery-ui/jquery-ui.min.js"></script>';
			$fh .= '<link rel="stylesheet" type="text/css" href="'.api_get_path(WEB_PATH).'web/assets/jquery-ui/themes/smoothness/jquery-ui.min.css">';
		} else {
			$fh .= '<script type="text/javascript" src="'.api_get_path(WEB_PATH).'vendor/studio-42/elfinder/js/elfinder.full.js"></script>';
			$fh .= '<link rel="stylesheet" type="text/css" href="'.api_get_path(WEB_PATH).'vendor/studio-42/elfinder/css/elfinder.full.css">';
			$fh .= '<script type="text/javascript" src="'.api_get_path(WEB_PATH).'web/assets/jquery-ui/jquery-ui.min.js"></script>';
			$fh .= '<link rel="stylesheet" type="text/css" href="'.api_get_path(WEB_PATH).'web/assets/jquery-ui/themes/smoothness/jquery-ui.min.css">';
			$fh .= '<link href="'.$pwp.'js/pell.min.css'.$version.'"  rel="stylesheet" type="text/css" />';
			$fh .= '<script src="'.$pwp.'js/pell.js'.$version.'" type="text/javascript" language="javascript"></script>';
		}

	}

	// MIGRATION PROCESS
	$ctrMigrationChamidoc = api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/migration202405.txt';
	if (!file_exists($ctrMigrationChamidoc)) {
		$fh .= '<div id="chamidoc_migration" ></div>';
	}
	
	$fh .= '<link rel="stylesheet" type="text/css" ';
	$fh .= ' href="'.$pwp.'css/studio_tools.css'.$version.'" >';
	$fh .= '<link rel="stylesheet" type="text/css" ';
	$fh .= ' href="'.$pwp.'css/chamilo_studio_store.css'.$version.'" >';

}

/* Display learningcoins extrafield for user */
if (!api_is_anonymous()) {

	$url_id = api_get_current_access_url_id();
	$learningCoinsAct = api_get_plugin_setting('chamidoc_tools','studio_tools_learningcoins-'.$url_id);
	if ($learningCoinsAct==''||$learningCoinsAct=='false'||$learningCoinsAct=='0') {$learningCoinsAct = false;}
	if ($learningCoinsAct) {

		$learningcoins = getExtraFieldlearningcoinsCD(api_get_user_id());

		if ($learningcoins!='') {

			$pwp = api_get_path(WEB_PLUGIN_PATH) . 'chamidoc_tools/resources/';
			
			$fh .= '<script src="'.$pwp.'js/lc_chamilo_s_tools_ui.js'.$version.'" ';
			$fh .= ' type="text/javascript" ></script>';
			
			$fh .= '<div id="learningcoins" >'.$learningcoins.'</div>';
			
			$fh .= '<script src="'.$pwp.'lc_shop/head.js'.$version.'" ';
			$fh .= ' type="text/javascript" ></script>';
			$fh .= '<script src="'.$pwp.'lc_shop/lc_avatar_store.js'.$version.'" ';
			$fh .= ' type="text/javascript" ></script>';
			$fh .= '<link href="'.$pwp.'lc_shop/lc_avatar_store.css'.$version.'"  rel="stylesheet" type="text/css" />';

		}
	}

}

echo $fh;

