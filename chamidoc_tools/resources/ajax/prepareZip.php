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

if (file_exists(__DIR__."/../../inc/functions.php")) {
    require_once(__DIR__."/../../inc/functions.php");
} else {
    echo "error";
    exit;
}

$iditem = isset($_GET['iditem']) ? $_GET['iditem'] : 0;
$zipsource = isset($_GET['zipsource']) ? $_GET['zipsource'] : 0;
$renderPath = getPathRenderCacheChamiDoc();

if ($iditem>0) {
	
	$destifolder = $renderPath.'htmlpresenter/';
	if(!file_exists($destifolder)){
		@mkdir($destifolder,0777);
	}

	$destifolder = $renderPath.'htmlpresenter/'.$iditem.'/';

	if(!file_exists($destifolder)){
		@mkdir($destifolder,0777);
	}

	$urSysDir = str_replace('/courses/',api_get_path(SYS_PATH).'app/courses/',$zipsource);	
	$nameFile = basename($urSysDir);
	$destifolderZipsource = $renderPath.'htmlpresenter/'.$iditem.'/'.$nameFile;
	$destifolderZipExtract = $renderPath.'htmlpresenter/'.$iditem;

	/*
		echo $urSysDir.'<br>';
		echo 'to<br/>';
		echo $destifolderZipsource.'<br>';
	*/
	$cleanfolder = $renderPath.'htmlpresenter/'.$iditem;
	deleteDir($cleanfolder);
	
	if(file_exists($destifolderZipsource)){
		@unlink($destifolderZipsource);
	}

	if(!file_exists($destifolderZipsource)){
		@copy($urSysDir,$destifolderZipsource);
		api_chmod_R($destifolderZipsource,api_get_permissions_for_new_directories());
	}

	if (file_exists($destifolderZipsource)) {

		$zipFile = new PclZip($destifolderZipsource);
		
		$zip_content_array = $zipFile->listContent();
		
		foreach ($zip_content_array as $this_content) {
		// echo $this_content['filename'].' '.$this_content['size'].'<br/>';
		}

		$newDir = $destifolderZipExtract;
		if ($newDir[strlen($newDir) - 1] == '/') {
			$newDir = substr($newDir, 0, -1);
		}
		chdir($newDir);
		// echo 'newDir : '.$newDir.'<br/>';
		if ($zipFile->extract(PCLZIP_OPT_PATH,$newDir)==0) {
			echo ("Unzip failed. Error : ".$zipFile->errorInfo(true).'<br>');
			// Unzip failed. Error : PCLZIP_ERR_BAD_FORMAT (-10) : Invalid archive structure
		}

		// $zipFile = new PclZip($urSysDir);
		// echo 'newDir : '.$newDir.'<br/>';
		// if ($zipFile->extract(PCLZIP_OPT_PATH,$newDir)==0) {
			// echo ("Unzip failed. Error : ".$zipFile->errorInfo(true).'<br>');
			// Unzip failed. Error : PCLZIP_ERR_BAD_FORMAT (-10) : Invalid archive structure
		// }

		/*
			$zip = new ZipArchive();
			if ($zip->open($destifolderZipsource) !== false) {
				$zip->extractTo($destifolder);
			}
		*/

		$destifolderIndex = $renderPath.'htmlpresenter/'.$iditem.'/index.html';
		
		$finalFile = '';
		$controlFile = '';

		if (file_exists($destifolderIndex )) {
			$finalFile = 'htmlpresenter/'.$iditem.'/index.html';
			$controlFile = 'index.html';
		} else {

			$searchfolderIndex = $renderPath.'htmlpresenter/'.$iditem;
			
			$dir = opendir($searchfolderIndex);
			while(false !== ( $file = readdir($dir)) ) { 
				if (( $file != '.' ) && ( $file != '..' )) {
					$pos = strpos($file,'.html');
					if ($pos !== false) {
						$finalFile = 'htmlpresenter/'.$iditem.'/'.$file;
						$controlFile = $file;
					}
				} 
			}
			closedir($dir);
			
			if ($finalFile=='') {

				$dir = opendir($searchfolderIndex);

				while(false !== ( $fold = readdir($dir)) ) { 
					if (( $fold != '.' ) && ( $fold != '..' )) {
						if ( is_dir($searchfolderIndex . '/' . $fold) ) {
							$finalEn = findAnEntry($searchfolderIndex . '/' . $fold);
							if ($finalEn!='') {
								$finalFile = 'htmlpresenter/'.$iditem.'/'.$fold.'/'.$finalEn;
								$controlFile = $fold.'/'.$finalEn;
							}
						}
						
					} 
				}
				closedir($dir);

			}
			
		}

		$searchControlIndex = $renderPath.'htmlpresenter/'.$iditem.'/'.$controlFile;
		
		if (file_exists($searchControlIndex )) {
			$sizeF = intval(filesize($searchControlIndex));
			if ($sizeF<2) {
				$finalFile = 'error_size_0';
			}
		}

		echo $finalFile;

	}

}


function findAnEntry($srcDir) {

	$finalF = '';

	$dir = opendir($srcDir);
	while(false !== ( $file = readdir($dir)) ) { 
		if (( $file != '.' ) && ( $file != '..' )) {
			$pos = strpos($file,'.html');
			if ($pos !== false) {
				$finalF = $file;
			}
		} 
	}
	closedir($dir);
	return $finalF;
}

function deleteDir($dirPath) {

	if (! is_dir($dirPath)) {
		if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
			$dirPath .= '/';
		}
		$files = glob($dirPath . '*', GLOB_MARK);
		foreach ($files as $file) {
			if (is_dir($file)) {
				deleteDir($file);
			} else {
				@unlink($file);
			}
		}
		rmdir($dirPath);	
	}

}

function import_package_zip(
        $zipFilePath,
        $zipFileName,
		$targetSysDir
    ) {
     

        // Get name of the zip file without the extension.
        $fileInfo = pathinfo($zipFileName);
        $filename = $fileInfo['basename'];
        $extension = $fileInfo['extension'];
        $fileBaseName = str_replace('.'.$extension, '', $filename);
       
        $zipFile = new PclZip($zipFilePath);
        // Check the zip content (real size and file extension).
        $zipContentArray = $zipFile->listContent();
        $packageType = '';
        $manifestList = [];
        // The following loop should be stopped as soon as we found the right imsmanifest.xml (how to recognize it?).
        $realFileSize = 0;
        foreach ($zipContentArray as $thisContent) {
            if (preg_match('~.(php.*|phtml)$~i', $thisContent['filename'])) {
                $file = $thisContent['filename'];
                echo ("File $file contains a PHP script");
            } 
            $realFileSize += $thisContent['size'];
        }

        // Now get the shortest path (basically, the imsmanifest that is the closest to the root).
        $shortestPath = $manifestList[0];
        $slashCount = substr_count($shortestPath, '/');
        foreach ($manifestList as $manifestPath) {
            $tmpSlashCount = substr_count($manifestPath, '/');
            if ($tmpSlashCount < $slashCount) {
                $shortestPath = $manifestPath;
                $slashCount = $tmpSlashCount;
            }
        }


        $newDir = '/';
 

        if ($newDir[strlen($newDir) - 1] == '/') {
            $newDir = substr($newDir, 0, -1);
        }

        if (is_dir($targetSysDir) ||
            @mkdir(
                $targetSysDir,
                api_get_permissions_for_new_directories()
            )
        ) {
          
            chdir($targetSysDir);

            $zipFile->extract(
                PCLZIP_CB_PRE_EXTRACT
            );

            if (!empty($newDir)) {
                $newDir = $newDir.'/';
            }
            api_chmod_R($targetSysDir, api_get_permissions_for_new_directories());
        } else {
            return false;
        }

    }