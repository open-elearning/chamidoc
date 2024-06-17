<?php

require_once __DIR__.'/../../../../main/inc/global.inc.php';

if (api_is_anonymous()) {
    echo "error";
    exit;
}

if (file_exists(__DIR__."/../../chamidoc_tools.php")) {
	require_once(__DIR__."/../../chamidoc_tools.php");
	$plugin = chamidoc_tools::create();
}

$html = '';

$html .= '<div class="blocChalkBoard turnactivepage" ';
$html .= 'onClick="processFormChalkBoard(\'turnactivepage\');" >';
$html .= "<div class='titleChalkBoard' >Active document".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard htmlpresenter" ';
$html .= 'onClick="processFormChalkBoard(\'htmlpresenter\');" >';
$html .= "<div class='titleChalkBoard' >html presenter".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard quizpresenter" ';
$html .= 'onClick="processFormChalkBoard(\'quizpresenter\');" >';
$html .= "<div class='titleChalkBoard' >Quiz presenter".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard turnpages" ';
$html .= 'onClick="processFormChalkBoard(\'turnpages\');" >';
$html .= "<div class='titleChalkBoard' >3D PageFlip Viewer".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpcrossword" ';
$html .= 'onClick="processFormChalkBoard(\'hvpcrossword\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >CrossWord".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpwordsmatch" ';
$html .= 'onClick="processFormChalkBoard(\'hvpwordsmatch\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >WordsMatch".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpdragthewords" ';
$html .= 'onClick="processFormChalkBoard(\'hvpdragthewords\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >Drag the words".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpimagejuxapose" ';
$html .= 'onClick="processFormChalkBoard(\'hvpimagejuxapose\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >Image Juxapose".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpmarkthewords" ';
$html .= 'onClick="processFormChalkBoard(\'hvpmarkthewords\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >Mark the words".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpfillintheblanks" ';
$html .= 'onClick="processFormChalkBoard(\'hvpfillintheblanks\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >Fill in the blanks".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvphelper" ';
$html .= 'onClick="showUploadManagerToObject();" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >H5P Loader".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard quizzacademy" ';
$html .= 'onClick="processFormChalkBoard(\'quizzacademy\');" >';
$html .= "<div class='titleChalkBoard' >Quizz Academy".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard videohelper" ';
$html .= 'onClick="showVideoManagerToObject();" >';
$html .= "<div class='titleChalkBoard' >Video Helper".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard videoscreenlock" ';
$html .= 'onClick="processFormChalkBoard(\'videoscreenlock\');" >';
$html .= "<div class='titleChalkBoard' >Video full".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard videocondition" ';
$html .= 'onClick="processFormChalkBoard(\'videocondition\');" >';
$html .= "<div class='titleChalkBoard' >Video condi..".'</div>';
$html .= '</div>';

// Extras style="display:none;"
$html .= '<div style="display:none;" class="blocChalkBoard videoandactivity" ';
$html .= 'onClick="processFormChalkBoard(\'videoandactivity\');" >';
$html .= "<div class='titleChalkBoard' >Video + Quiz".'</div>';
$html .= '</div>';


$html .= '<div class="blocChalkBoard linktoconference" ';
$html .= 'onClick="processFormChalkBoard(\'linktoconference\');" >';
$html .= "<div class='titleChalkBoard' >Link to conference".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard cachecacheword" ';
$html .= 'onClick="processFormChalkBoard(\'cachecacheword\');" >';
$html .= "<div class='titleChalkBoard' >Cache Word".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard winanim01" ';
$html .= 'onClick="processFormChalkBoard(\'winanim01\');" >';
$html .= "<div class='titleChalkBoard' >Win Animation".'</div>';
$html .= '</div>';


$html .= '<div class="blocChalkBoard winanim03" ';
$html .= 'onClick="processFormChalkBoard(\'winanim03\');" >';
$html .= "<div class='titleChalkBoard' >Escape code".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard gameimageactive" ';
$html .= 'onClick="processFormChalkBoard(\'gameimageactive\');" >';
$html .= "<div class='titleChalkBoard' >Image Active".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpfillintheblanks" ';
$html .= 'onClick="processFormChalkBoard(\'hvpfillintheblankscs\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >Fill Blanks Case Sensitive".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard hvpcompildragdrop" ';
$html .= 'onClick="processFormChalkBoard(\'hvpcompildragdrop\');" >';
$html .= "<div class='iconhvp' ></div>";
$html .= "<div class='titleChalkBoard' >Drag Drop Image".'</div>';
$html .= '</div>';

$html .= '<div class="blocChalkBoard solarsystem" ';
$html .= 'onClick="processFormChalkBoard(\'solarsystem\');" >';
$html .= "<div class='titleChalkBoard' >Solar System 3D".'</div>';
$html .= '</div>';


// Extras style="display:none;"

$html .= '<div style="display:none;" class="blocChalkBoard learningcoins1" ';
$html .= 'onClick="processFormChalkBoard(\'learningcoins1\');" >';
$html .= "<div class='titleChalkBoard' >Learningcoins +1".'</div>';
$html .= '</div>';

$html .= '<div style="display:none;" class="blocChalkBoard learningcoins5" ';
$html .= 'onClick="processFormChalkBoard(\'learningcoins5\');" >';
$html .= "<div class='titleChalkBoard' >Learningcoins +5".'</div>';
$html .= '</div>';

$html .= '<div style="display:none;" class="blocChalkBoard brain3d" ';
$html .= 'onClick="processFormChalkBoard(\'brain3d\');" >';
$html .= "<div class='titleChalkBoard' >Brain 3d Viewer".'</div>';
$html .= '</div>';

$html .= '<div style="display:none;" class="blocChalkBoard viewermol3d" ';
$html .= 'onClick="processFormChalkBoard(\'viewermol3d\');" >';
$html .= "<div class='titleChalkBoard' >Viewer JsMol".'</div>';
$html .= '</div>';

$html .= '<div style="display:none;" class="blocChalkBoard quota" ';
$html .= 'onClick="processFormChalkBoard(\'quota\');" >';
$html .= "<div class='titleChalkBoard' >Quota".'</div>';
$html .= '</div>';

$html .= '<div style="display:none;" class="blocChalkBoard winanim02" ';
$html .= 'onClick="processFormChalkBoard(\'winanim02\');" >';
$html .= "<div class='titleChalkBoard' >Treasure Animation".'</div>';
$html .= '</div>';

$html .= '<a style="display:none;" class="blocChalkBoard blocMood modxlightboxgallery" title="mod_lightboxgallery by Andrew Hancox and Adam Olley" ';
$html .= 'onClick="processFormChalkBoard(\'modxlightboxgallery\');" >';
$html .= "<div class='iconmod' ></div>";
$html .= "<div class='titleChalkBoard' >mod_lightboxgallery".'</div>';
$html .= '</a>';

$html .= '<div style="display:none;" class="blocChalkBoard blocMood learningapps" ';
$html .= 'onClick="processFormChalkBoard(\'learningapps\');" >';
$html .= "<div class='titleChalkBoard' >learningapps".'</div>';
$html .= '</div>';

$html .= '<div style="display:none;" class="blocChalkBoard blocMood padletapps" ';
$html .= 'onClick="processFormChalkBoard(\'padletapps\');" >';
$html .= "<div class='titleChalkBoard' >padletapps".'</div>';
$html .= '</div>';

$html .= "<p style='position:relative;float:left;width:100%;text-align:center;' ><br/>";
$html .= "&nbsp;Chamidoc Tools v <strong>".$plugin->get_info()['version'].'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;';
$html .= '<a href="#" onclick="showStoreManagerToObject()" style="cursor:pointer;" >Install an extension</a>';
$html .= '&nbsp;<a href="https://www.ludiscape.com/ressources/chalkboard-tools-for-chamilo/" target="_blank" >';
$html .= '<img style="margin-top:-2px;" src="'.api_get_path(WEB_PATH).'plugin/chamidoc_tools/resources/img/interro.png" /></a>';
$html .= '</p>';

echo $html;
