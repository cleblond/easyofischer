<?




require_once(dirname(__FILE__) . '/../../../config.php');
//require_once('renderer.php');

require_login(0, false);

global $OUTPUT;
$numofstereo = required_param('numofstereo', PARAM_TEXT);

$easyonewmanbuildstring=file_get_contents('edit_fischer'.$numofstereo.'.html').file_get_contents('fischer_dragable.html');


echo $easyonewmanbuildstring;


?>
