Chamidoc TOOLS plugin
===
This plugin is only compatible with Chamilo version 1.11.2 and above.

This plugin allows you to create contents resources directly from inside Chamilo,
using the Open Source H5P library.

To enable:
* install the plugin
* mark it as "enabled" (inside the plugin configuration page)
* set the plugin to the region "pre_footer"
* add user extra field : "learningcoins" integer / entier (main/admin/extra_fields.php?type=user)
* add user extra field : "learningcoinsavatarskin" text / Texte
* add user extra field : "learningcoinsitemscoll"  text / Texte 

Migration 2024 from chalkboard :
please desactivate (not delete) chalkboard plugin if exist in your system
make right 777 to index.php during the migration

For conditionnal objects :
* create an extra field "no_automatic_validation" of lp_item of type "check box" (fr : case a cocher)
Chamilo by default changes the lp item to status = complete when the
LP is a document. Setting the "no_automatic_validation" to true,
Chamilo will not do that. The HTML file will be in charge of that update
The document can update the status with LMSCommit('iframe');
* set $_configuration['lp_score_as_progress_enable'] = true; // on configuration.php

Once enabled, permissions granted and the pre_footer region set for the plugin, 
a new tab logo will appear in the 
document creation section, exclusively in the learning path document creation
interface (don't look for it anywhere else at this point).

We hope to be improving this in the future, but we will not be able, in future
versions, to assign content created in this version to the correct teacher.

We suggest you consider this plugin as a Beta version.

To enable tools in the document editor, please enable it in region pre_footer.

Other docs : 
https://www.ludiscape.com/ressources/chalkboard-tools-for-chamilo/

En Francais :
Pour les objets conditionnels :
* Il faut créer un champs extra "no_automatic_validation" sur l'objet lp_item avec le type "case a cocher"
Sinon Chamilo par default change le statustu de votre grain de formation lp item à complete dans les parcours. 
Cocher cette nouvelle case "no_automatic_validation" ou bloclk progress,
Dans ce cas c'est l'objet chamilo studio qui décide si le grain de formation est validé ou non.
* dans configuration.php il faut mettre $_configuration['lp_score_as_progress_enable'] = true; 
Il faut se deconnecter reconnecter
Depuis la version 3.5 une abscence de vidéo entraine une non validation du grain de formation.

Plus d'informations ici : 
https://www.ludiscape.com/ressources/chalkboard-tools-for-chamilo/


Probleme de validation :
Lors du retour vers un parcours la progression s'active automatiquement