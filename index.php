<?php 
include("fckeditor/fckeditor.php") ; 
?> 
<html>
<head></head>
<h1>Consulta de actividades</h1>
<body>
<form action=”” method=””>
 <div id="form_observ style=" width:510px;height:190px;overflow:auto;align:center;padding:5px 0 5px 0;>
		<h2>Observaciones</h2>
		<p>Nombre de la actividad: </p><p>     
				

<?php 
    $oFCKeditor = new FCKeditor('con_observaciones') ;
    $oFCKeditor->BasePath = 'fckeditor/';
    $oFCKeditor->Width  = '900' ;
    $oFCKeditor->Height = '600' ;
    $oFCKeditor->Create() ;
?>                        

                            
</div>
</form>
</body>
</html>
