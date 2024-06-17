<?php
/* For licensing terms, see /license.txt */
/* chamidoc_objects.php */

class chamidoc_tools extends Plugin
{
    protected function __construct()
    {
        parent::__construct(
            '4.0',
            'Bâtisseurs Numériques / Damien Renou',
            array(
                'enable_plugin_chamidoc_tools' => 'boolean'
            )
        );
    }
	
    // @return chamidoc_tools |null
    public static function create()
    {
        static $result = null;
        return $result ? $result : $result = new self();
    }
	
    public function install()
	{
        
        //action=add_item&type=step&lp_id=5&cidReq=TEST
        
        $sql = "CREATE TABLE IF NOT EXISTS plugin_chalkboard_tools(
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT,
            node_type VARCHAR(155),
            lp_id INT,
            path_item INT,
            url_id INT,
            title VARCHAR(255) NOT NULL,
            descript VARCHAR(255) NOT NULL,
            creation_date VARCHAR(12) NOT NULL,
            opt_1 VARCHAR(512) NOT NULL,
            opt_2 VARCHAR(512) NOT NULL,
            opt_3 VARCHAR(512) NOT NULL,
            PRIMARY KEY (id));";
        Database::query($sql);
        
    }
	
    public function uninstall()
    {

    }
}
