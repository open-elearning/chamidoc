<?php

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

$url_id = api_get_current_access_url_id();

$linkGetLearningCoin = api_get_plugin_setting('chamidoc_tools','studio_tools_linkgetlearningcoin-'.$url_id);

$studio_tools_openpage = api_get_plugin_setting('chamidoc_tools','studio_tools_openpage-'.$url_id);

if ($linkGetLearningCoin=='') {
    echo 'error: No url in plugin chamilo studio options !';
}

if ($studio_tools_openpage==0||$studio_tools_openpage==false) {
    echo 'inner:'.$linkGetLearningCoin;
} else {
    echo $linkGetLearningCoin;
}