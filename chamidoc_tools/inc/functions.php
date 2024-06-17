<?php

function getExtraFieldlearningcoinsCD($userId) {

    $selectVal = '';
    $extraID =  0;
    $sql = "SELECT id FROM extra_field WHERE variable LIKE 'learningcoins' ;";
    $resultExtra = Database::query($sql);
    while($row = Database::fetch_array($resultExtra)){
        $extraID = intVal($row["id"]);
    }
    if ($extraID>0) {
		$sqlDetect = " SELECT value FROM extra_field_values ";
		$sqlDetect .= "WHERE field_id = $extraID AND item_id = $userId ";
		$existExtra = Database::query($sqlDetect);
		while($rowDetect = Database::fetch_array($existExtra)){
			$selectVal = $rowDetect["value"];
		}
    }
    
    return $selectVal;
    
}

function setExtraFieldlearningcoinsCD($userId,$neoVal) {

    $extraID =  0;
    $sql = "SELECT id FROM extra_field WHERE variable LIKE 'learningcoins' ;";
    $resultExtra = Database::query($sql);
    while($row = Database::fetch_array($resultExtra)){
        $extraID = intVal($row["id"]);
    }
    if ($extraID>0) {
		$sqlDetect = " UPDATE  extra_field_values SET value = $neoVal ";
		$sqlDetect .= "WHERE field_id = $extraID AND item_id = $userId ";
		$existExtra = Database::query($sqlDetect);

    }
    
}

function getExtraFieldItemsAvatarGlobalCD($userId) {

    $selectVal = '';
    $extraID =  0;
    $sql = "SELECT id FROM extra_field WHERE variable LIKE 'learningcoinsitemscoll' ;";
    $resultExtra = Database::query($sql);
    while($row = Database::fetch_array($resultExtra)){
        $extraID = intVal($row["id"]);
    }
    if ($extraID>0) {
		$sqlDetect = " SELECT value FROM extra_field_values ";
		$sqlDetect .= "WHERE field_id = $extraID AND item_id = $userId ";
		$existExtra = Database::query($sqlDetect);
		while($rowDetect = Database::fetch_array($existExtra)){
			$selectVal = $rowDetect["value"];
		}
    }
    
    return $selectVal;
    
}

function setExtraFieldItemsAvatarGlobalCD($userId,$neoVal) {

  $extraID =  0;
  $sql = "SELECT id FROM extra_field WHERE variable LIKE 'learningcoinsitemscoll' ;";
  $resultExtra = Database::query($sql);
  while($row = Database::fetch_array($resultExtra)){
      $extraID = intVal($row["id"]);
  }
  if ($extraID>0) {
    $sqlDetect = " UPDATE  extra_field_values SET value = '$neoVal' ";
    $sqlDetect .= "WHERE field_id = $extraID AND item_id = $userId ";
    $existExtra = Database::query($sqlDetect);
  }
    
}

function getPathRenderCacheChamiDoc() {
  
  $cacheDir = api_get_path(SYS_APP_PATH).'upload/rendercache/';
	if (!file_exists($cacheDir)) {
		mkdir($cacheDir, 0777, true);
	}
  return $cacheDir;

}

function getWPathRenderCacheChamiDoc() {
  
  $cacheDir = api_get_path(WEB_APP_PATH).'upload/rendercache/';
	if (!file_exists($cacheDir)) {
		mkdir($cacheDir, 0777, true);
	}
  return $cacheDir;

}

function getWPathChamiDocPath() {
  
  $cacheDir = api_get_path(WEB_PLUGIN_PATH).'chamidoc_tools/';
  return $cacheDir;

}

function recurseCopyMigrationChamidoc($src,$dst,&$nb)
{

    $dir = opendir($src);
    @mkdir($dst); 
    
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) 
        && ( $file != '..' ) 
        && ( $file != 'Thumbs.db' ) && $nb<10 ) { 
            if ( is_dir($src . '/' . $file) ) { 
              recurseCopyMigrationChamidoc($src . '/' . $file,$dst . '/' . $file,$nb); 
            } else { 
              // no php files
              if (strpos($file, '.php') === false) {
                if (!file_exists($dst . '/' . $file)) {
                  copy($src . '/' . $file,$dst . '/' . $file);
                  $nb++;
                }
              }
            }
        } else {
          if ($nb>3) {
            break;
          }
        }
    }
    
    closedir($dir);
    return $nb;
    
}