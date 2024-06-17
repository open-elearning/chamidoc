<?php

/**
 * This script is a configuration file for the add_this plugin.
 * These settings will be used in the administration interface for plugins
 * (Chamilo configuration settings->Plugins)
 * @package chamilo.plugin Chamilo Studio tools
 * @author Damien Renou
*/
 
/* Plugin config */

require_once __DIR__.'/../../main/inc/global.inc.php';

$varUrl = __DIR__.'/chamidoc_tools.php';

require_once($varUrl);

$plugin_info = chamidoc_tools::create()->get_info();

// The plugin title
$plugin_info['title'] = 'Chamidoc Tools';
// The comments that go with the plugin
$plugin_info['comment'] = "Chamidoc Tools for chamilo (pre_footer)";
// The plugin version
$plugin_info['version'] = '4.0';
// The plugin author
$plugin_info['author'] = 'Bâtisseurs Numériques / Damien Renou';

// The plugin configuration
$form = new FormValidator('form');

$defaults = array();

$url_id = api_get_current_access_url_id();

$defaults['active'] = api_get_plugin_setting('chamidoc_tools','studio_tools_learningcoins-'.$url_id);
$stringTitle = $form->addElement('checkbox','studio_tools_learningcoins-'.$url_id,'Learning Coins','');
if($defaults['active']==''){$defaults['active'] = false;}
$stringTitle->setValue($defaults['active']);

$defaults['linkgetlearningcoin'] = api_get_plugin_setting('chamidoc_tools','studio_tools_linkgetlearningcoin-'.$url_id);
$Linkgetlearningcoin = $form->addElement('text','studio_tools_linkgetlearningcoin-'.$url_id, 'Link get Coins :');
$Linkgetlearningcoin->setValue($defaults['linkgetlearningcoin']);

$defaults['studio_tools_openpage'] = api_get_plugin_setting('chamidoc_tools','studio_tools_openpage-'.$url_id);
$openpageopt = $form->addElement('checkbox','studio_tools_openpage-'.$url_id,'Open in new page','');
if($defaults['studio_tools_openpage']==''){$defaults['studio_tools_openpage'] = false;}
$openpageopt->setValue($defaults['studio_tools_openpage']);

$defaults['rescuevideo'] = api_get_plugin_setting('chamidoc_tools','studio_tools_rescuevideo-'.$url_id);
$Linkrescuevideo = $form->addElement('text','studio_tools_rescuevideo-'.$url_id, 'rescue server :');
$Linkrescuevideo->setValue($defaults['rescuevideo']);

$form->addButtonSave(get_lang('Save'));

$plugin_info['settings_form'] = $form;

$plugin_info['templates'] = array('inc/template.tpl');

$hjs = file_get_contents(api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/resources/js/chalkboardtools_base.js');
if ($defaults['rescuevideo']==''){$defaults['rescuevideo'] = 'urlnone';}
$hjs = str_replace("'urlnone'","'".$defaults['rescuevideo']."'",$hjs);
$fp = fopen(api_get_path(SYS_PLUGIN_PATH).'chamidoc_tools/resources/js/chalkboardtools.js','w');
fwrite($fp,$hjs);
fclose($fp);
