<?php

require_once __DIR__.'/../../../../main/inc/global.inc.php';

if (api_is_anonymous()) {
    echo "error anonymous";
    exit;
}
$is_allowed_to_edit = api_is_allowed_to_edit(false, true, false, false);

if (!$is_allowed_to_edit) {
    echo "error allowed_to_edit";
    exit;
}

$directoryParentId = isset($_GET['directoryparentid']) ? $_GET['directoryparentid'] : 0;
$cidReq = isset($_GET['cidReq']) ? $_GET['cidReq'] : 0;
$courseInfo = api_get_course_info($cidReq);
$parent = isset($_POST['parent']) ? $_POST['parent'] : '';
$previous = isset($_POST['previous']) ? $_POST['previous'] : '';
$type = TOOL_DOCUMENT;
$path = isset($_POST['path']) ? $_POST['path'] : '';
$lpid = isset($_GET['lpid']) ? $_GET['lpid'] : '';
$urldata = isset($_GET['urldata']) ? $_GET['urldata'] : '';

$description = '';
$prerequisites = '';
$maxTimeAllowed = '';

$randomnumber = rand(1, 1000);

$typec = isset($_GET['typec']) ? $_GET['typec'] : '';

$post_title = 'chamidoc-'.$typec.'-'.$randomnumber;

if ($typec=='gameimageactive') {
    $post_title = 'Image active';
}
if ($typec=='winanim01') {
    $post_title = 'Win Animation';
}
if ($typec=='winanim02') {
    $post_title = 'Treasure Animation';
}
if ($typec=='winanim03') {
    $post_title = 'Escape code';
}
if ($typec=='quota') {
    $post_title = 'Quota';
}

if ($typec=='learningcoins1'||$typec=='learningcoins5'||$typec=='learningcoins10') {
    $post_title = 'Learning Coins';
}

if ($typec!='') {
    
    $dataF = '<html><head></head><body><p>chalkboardguid:'.$typec.'@';
    if ($urldata!=''&&$typec=='videoscreenlock'){
        $dataF .= $urldata.'@169@';
    }
    if ($urldata!=''&&$typec=='h5player'){
        $dataF .= $urldata.'@@';
    }
    if ($post_title=='Learning Coins'){
        $dataF .= 'Récupérer la pièce@Tous les objets ont été pris ici !@@@';
    }
    $dataF .= '@:end</p></body></html>';
    
    $nameLP = '';
    $sqlLP = "SELECT c_lp.NAME FROM c_lp where id = $lpid ";
    $resultLP = Database::query($sqlLP);
    while ($rowLP = Database::fetch_array($resultLP)) { $nameLP = $rowLP['NAME']; }

    $lpCount = 0;
    $sqlCount = "SELECT iid FROM c_lp_item where lp_id = $lpid ";
    $resultCount= Database::query($sqlCount);
    while ($rowLP = Database::fetch_array($resultCount)) { 
        $lpCount++;
    }
    $lpCount++;
    $lpCount++;

    

    $infofilename = 'chamidoc-'.$typec.'-'.$randomnumber;
    
    $courseInfo['real_id'] = api_get_course_int_id();

    $document_id = $_SESSION['oLP']->create_document(
        $courseInfo,
        $dataF,
        $infofilename,
        'html',
        $directoryParentId
    );

    $node_id = $_SESSION['oLP']->add_item(
        $parent,
        $previous,
        $type,
        $document_id,
        $post_title,
        $description,
        $prerequisites
    );

    $sqlUpdate = "UPDATE c_lp_item SET display_order = $lpCount WHERE c_lp_item.iid = $node_id;";
    Database::query($sqlUpdate);

    $eventLpId = intval($_SESSION['oLP']->get_id());
    $urlReturn = api_get_path(WEB_PATH).'main/lp/lp_controller.php?action=add_item&type=step&lp_id='.intval($_SESSION['oLP']->lp_id).'&'.api_get_cidreq();
    $urlReturn = api_get_path(WEB_PATH).'main/lp/lp_controller.php?id_session=0&gidReq=0&gradebook=0&origin=&action=edit_item&view=build&id='.$node_id.'&lp_id='.$eventLpId.'&path_item=0&chalkboard='.$node_id;
    echo $urlReturn;
    
}