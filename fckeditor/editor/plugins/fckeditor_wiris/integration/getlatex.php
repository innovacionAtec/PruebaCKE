<?php
include 'libwiris.php';

if (isset($_POST['mml'])) {
	$config = wrs_loadConfig(WRS_CONFIG_FILE);
	
	if (isset($config['wirismathmltolatexurl'])) {
		$url = $config['wirismathmltolatexurl'];
	}
	else {
		$url = wrs_getImageServiceURL($config, 'mathml2latex');
	}
	
	$response = wrs_getContents($url, array('mml' => $_POST['mml']));

	if ($response !== false) {
		echo $response;
	}
	else {
		echo 'Error connecting to the latex translator service.';
	}
}
?>