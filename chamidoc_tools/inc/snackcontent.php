<?php

    function contentsProcessSnack($fileCorrection,$version,$pwp){

        $fh = '';
        $fh .= '<script type="text/javascript" >console.log("file_exists '.$fileCorrection.'");</script>';
				
        $contentCorrect = file_get_contents($fileCorrection);
        $contentCorrectNew = $contentCorrect;

        $haveUpdate = false;
        $haveChamiloDocLib = false;
       
        $posClueVIDEO = strrpos($contentCorrectNew,"<video");

        if($posClueVIDEO!=false){
            
            $posClue100p = strrpos($contentCorrectNew,"100%");
            if($posClue100p!=false){
                $haveChamiloDocLib = true;
            }

            $posClueNd = strrpos($contentCorrectNew,"nodownload");
            if($posClueNd===false){
                $contentCorrectNew = str_replace("<video ","<video oncontextmenu='return false;' controlsList='nodownload' ",$contentCorrectNew);
                $haveUpdate = true;
            }
        
            $posClueAP = strrpos($contentCorrectNew,"autoplay");
            if($posClueAP===false){
                $contentCorrectNew = str_replace("<video ","<video autoplay ",$contentCorrectNew);
                $haveUpdate = true;
            }

        }

        $posClueMAG = strrpos($contentCorrectNew,"magazine");
        $posClueTJS = strrpos($contentCorrectNew,"turn.js");

        if($posClueMAG!=false){
            
            $haveChamiloDocLib = true;

            if($posClueTJS===false){
                //$lk = '<iframe id="magazine" style="width:1000px;height:760px;overflow:hidden;" scrolling="no" src="efrt-video.html" ></iframe>';
                
                $lk = '<style type="text/css" >body{background:#ccc;}#magazine{width:1152px;height:752px;}
                #magazine .turn-page{background-color:#ccc;background-size:100% 100%;}</style>';
                $lk .= '<script src="'.$pwp.'jquery.js'.$version.'" type="text/javascript" ></script>';
                $lk .= '<script src="'.$pwp.'turn.js'.$version.'" type="text/javascript" ></script>';
                $contentCorrectNew = str_replace("</body>",$lk ."</body>",$contentCorrectNew);
                $haveUpdate = true;
                
            }
        
        }
        
        //delete old lib
        $posClueOld = strrpos($contentCorrectNew,"chamilo_boost_cool_docs.js");
        if($posClueOld){
            $contentCorrectNew = str_replace("chamilo_boost_cool_docs.js","");
        }

        $posClue = strrpos($contentCorrectNew,"engine_cool_docs.js");
        
        if($posClue===false){
            
            $fh .= '<script type="text/javascript" >console.log("engine_cool_docs is include ! ");</script>';

            $cool = '<script src="'.$pwp.'engine_cool_docs.js'.$version.'" type="text/javascript" ></script>';
            $contentCorrectNew = str_replace("</body>",$cool."</body>",$contentCorrectNew);
            $haveUpdate = true;
        }

        if($haveUpdate){

            $fp = fopen($fileCorrection,'w');
            fwrite($fp,$contentCorrectNew);
            fclose($fp);

            $saveFileCorrection= str_replace(".html","-save.html",$fileCorrection);
            $fp = fopen($saveFileCorrection,'w');
            fwrite($fp,$contentCorrect);
            fclose($fp);
                
        }

        return $fh;


    }
