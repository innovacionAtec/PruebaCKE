<?php 
include("fckeditor/fckeditor.php") ; 
?> 
<html>
<head></head>
<h2>Consulta de actividades</h2>
<body>
<form action=”” method=””>
 <div id="form_observ style=" width:510px;height:190px;overflow:auto;align:center;padding:5px 0 5px 0;>
	<p>Nombre de la actividad: </p>     
	<p>Descripcion de la actividad:</p>
				
<?php 
    $oFCKeditor = new FCKeditor('descripcion') ;
    $oFCKeditor->BasePath = 'fckeditor/';
    $oFCKeditor->Width  = '700' ;
    $oFCKeditor->Height = '300' ;
    $oFCKeditor->Create() ;
?>                        
                            
</div>
</form>
</body>
</html>
