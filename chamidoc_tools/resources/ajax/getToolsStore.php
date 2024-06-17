<?php

$html = '';

$html .= '<div  class="blocStoreBoard videoandactivity" >';
$html .= "<div class='titleChalkBoard' >Video + Quiz".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "Engaging learners with a dual approach, combining a video presentation for visual understanding and a quiz for active participation, enhances comprehension and retention, fostering a dynamic learning experience.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-videoandactivity" onClick="processStoreInstall(\'videoandactivity\');">Install</button>';
$html .= '</div>';

$html .= '<div  class="blocStoreBoard learningcoins1" >';
$html .= "<div class='titleChalkBoard' >Learningcoins +1".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "Allows the learner to win 1 learning coin.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-learningcoins1" onClick="processStoreInstall(\'learningcoins1\');">Install</button>';
$html .= '</div>';

$html .= '<div  class="blocStoreBoard learningcoins5" >';
$html .= "<div class='titleChalkBoard' >Learningcoins +5".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "Allows the learner to win 5 learning coins.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-learningcoins5" onClick="processStoreInstall(\'learningcoins5\');">Install</button>';
$html .= '</div>';

$html .= '<div  class="blocStoreBoard winanim02" >';
$html .= "<div class='titleChalkBoard' >Treasure Animation".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "Treasure Winner Animation";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-winanim02" onClick="processStoreInstall(\'winanim02\');">Install</button>';
$html .= '</div>';


$html .= '<div class="blocStoreBoard viewermol3d" title="Open-Source Java viewer for chemical structures in 3D" >';
$html .= "<div class='titleChalkBoard' >Viewer JsMol".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "JSmol is the HTML5 modality of Jmol, able to be embedded into web pages. All the functionality of Jmol (as a standalone application) is also present in JSmol.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-viewermol3d" onClick="processStoreInstall(\'viewermol3d\');">Install</button>';
$html .= '</div>';

$html .= '<a class="blocStoreBoard modxlightboxgallery" title="mod_lightboxgallery by Andrew Hancox and Adam Olley"  >';
$html .= "<div class='iconmod' ></div>";
$html .= "<div class='titleChalkBoard' >mod_lightboxgallery".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "This resource allows you to create 'Lightbox' enabled image galleries within your LMS course. As a course teacher, you are able to create, edit and delete galleries. Smallthumbnails will then be generated, which are used for the thumbnail view of the gallery.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-modxlightboxgallery" onClick="processStoreInstall(\'modxlightboxgallery\');">Install</button>';
$html .= '</a>';

$html .= '<div  class="blocStoreBoard learningapps" title="mod_learningapps by LearningApps Wolfackerstrasse 33 CH-4658 Däniken" >';
$html .= "<div class='iconmod' ></div>";
$html .= "<div class='titleChalkBoard' >mod_learningapps".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "LearningApps.org supports learning and teaching processes with small interactive, multimedia exercises. The exercises can be created and used very easily online. A number of templates (assignment exercises, multiple choice tests, etc.) are available.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-learningapps" onClick="processStoreInstall(\'learningapps\');">Install</button>';
$html .= '</div>';

$html .= '<div  class="blocStoreBoard padletapps" title="mod_padletapps by padlet.com" >';
$html .= "<div class='iconmod' ></div>";
$html .= "<div class='titleChalkBoard' >mod_padletapps".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "padletapps.com Somewhere between a doc and a full-fledged website builder, Padlet empowers everyone to make the content they want, whether it's a quick bulletin board, a blog, or a portfolio.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-padletapps" onClick="processStoreInstall(\'padletapps\');">Install</button>';
$html .= '</div>';

$html .= '<a class="blocStoreBoard quota" >';
$html .= "<div class='titleChalkBoard' >Quota".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "Make a pause betewen two items";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-quota" onClick="processStoreInstall(\'quota\');">Install</button>';
$html .= '</a>';

$html .= '<div class="blocStoreBoard brain3d" >';
$html .= "<div class='titleChalkBoard' >Brain 3d Viewer".'</div>';
$html .= "<div class='descriStudioBoard' >";
$html .= "Brain. Rotate this 3D model to see the four major regions of the brain: the cerebrum, diencephalon, cerebellum, and brainstem.";
$html .= '</div>';
$html .= '<button class="btn btnStore btn-primary btn-brain3d" onClick="processStoreInstall(\'brain3d\');">Install</button>';
$html .= '</div>';

echo $html;
