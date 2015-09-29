<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>jQuery Easy - Importar Excel</title>
<link rel="stylesheet" type="text/css" href="http://www.jqueryeasy.com/wp-content/themes/bigfoot/style.css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="jQuery Easy RSS Feed" href="http://www.jqueryeasy.com/feed/" />
<link rel="alternate" type="application/atom+xml" title="jQuery Easy Atom Feed" href="http://www.jqueryeasy.com/feed/atom/" />
<link rel="pingback" href="http://www.jqueryeasy.com/xmlrpc.php" />
<link rel="shortcut icon" href="http://www.jqueryeasy.com/wp-content/themes/bigfoot/images/favicon.ico" />
<link rel='stylesheet' id='wp-pagenavi-css'  href='http://www.jqueryeasy.com/wp-content/plugins/wp-pagenavi/pagenavi-css.css?ver=2.70' type='text/css' media='all' />
<script type='text/javascript' src='http://www.jqueryeasy.com/wp-includes/js/l10n.js?ver=20101110'></script>
<script type='text/javascript' src='http://www.jqueryeasy.com/wp-includes/js/jquery/jquery.js?ver=1.6.1'></script>
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="http://www.jqueryeasy.com/xmlrpc.php?rsd" />
<link rel="wlwmanifest" type="application/wlwmanifest+xml" href="http://www.jqueryeasy.com/wp-includes/wlwmanifest.xml" /> 
<link rel='index' title='jQuery Easy' href='http://www.jqueryeasy.com/' />
<meta name="generator" content="WordPress 3.2.1" />
<!-- All in One SEO Pack 1.6.13.8 by Michael Torbert of Semper Fi Web Design[280,300] -->
<meta name="description" content="Blog donde podrás encontrar una serie artículos, tutoriales,  relacionados a la creación de aplicaciones web, utilizando las últimas tecnologías que actualmente existen como jQuery, PHP, Mysql, CSS3 y mas." />
<meta name="keywords" content="aplicaciones, jquery,css,php,html,javascript,java,aplicaciones jquery,seo,android,codeinigter,xml, aplicaciones codeigniter, cursos jquery, cursos, tutoriales" />
<link rel="canonical" href="http://www.jqueryeasy.com/" />
<!-- /all in one seo pack -->
<link href="http://www.jqueryeasy.com/wp-content/plugins/fuzzy-seo-booster/seoqueries.css" rel="stylesheet" type="text/css" />	
<!-- START: Syntax Highlighter ComPress -->
<script type="text/javascript" src="http://www.jqueryeasy.com/wp-content/plugins/syntax-highlighter-compress/scripts/shCore.js"></script>
<script type="text/javascript" src="http://www.jqueryeasy.com/wp-content/plugins/syntax-highlighter-compress/scripts/shAutoloader.js"></script>
<link type="text/css" rel="stylesheet" href="http://www.jqueryeasy.com/wp-content/plugins/syntax-highlighter-compress/styles/shCoreDefault.css"/>
<!-- END: Syntax Highlighter ComPress -->
<style type="text/css">.recentcomments a{display:inline !important;padding:0 !important;margin:0 !important;}</style>
<script language="javascript" type="text/javascript" src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/javascripts/jquery.js"></script>
<script language="javascript" type="text/javascript" src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/javascripts/tabber.js"></script>
<script language="javascript" type="text/javascript" src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/javascripts/superfish.js"></script>
<!--[if lt IE 7]>
<script type="text/javascript" src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/javascripts/pngfix.js"></script>
<script type="text/javascript" src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/javascripts/menu.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="http://www.jqueryeasy.com/wp-content/themes/bigfoot/css/ie.css" />
<![endif]-->
</head>
<body>
<div id="header">
   	<div class="wrap">
   		<div class="left">
			<div id="logo">
                <a href="http://www.jqueryeasy.com" title="Otro sitio realizado con WordPress">
                    <img src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/images/logo.png" alt="Otro sitio realizado con WordPress" /> 
                </a>
				<div class="flike"><div class="fb-like" data-href="http://www.facebook.com/pages/JQueryEasy/246795248721504" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div></div>
			</div> <!--end #logo-->
		</div> <!--end .left-->
		<div id="search">

			<form method="get" id="searchform" action="http://www.jqueryeasy.com">
				<input type="text" class="field" name="s" id="s"  value="Buscar en este blog..." onfocus="if (this.value == 'Buscar en este blog...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Buscar en este blog...';}" />
				<input class="submit btn" type="image" src="http://www.jqueryeasy.com/wp-content/themes/bigfoot/images/icon-search.png" value="Go" />
			</form>
		</div>
    </div>
</div>
<style type="text/css">
	#demos{
		width:800px;
		margin:10px auto 0 auto;
		padding:30px;
		border:1px solid #DFDFDF;
		font:normal 12px Arial, Helvetica, sans-serif
	}
	#demos h3{
		border-bottom:1px solid #DFDFDF;
		padding-bottom:7px;
		margin:10px 0
	}
	table{
		margin-top:15px;
		width:100%
	}
	table td{
		padding:7px;
		border:1px solid #CCC
	}
</style>
<div id="demos">
    <h3>Seleccionar archivo Excel</h3>
    <form name="frmload" method="post" action="index.php" enctype="multipart/form-data">
        <input type="file" name="file" /> &nbsp; &nbsp; &nbsp; <input type="submit" value="----- IMPORTAR -----" />
    </form>
    <div id="show_excel">
    	<?php 
		
		if($_FILES['file']['name'] != '')
		{
			
			require_once 'reader/Classes/PHPExcel/IOFactory.php';

			//Funciones extras
			
			function get_cell($cell, $objPHPExcel){
				//select one cell
				$objCell = ($objPHPExcel->getActiveSheet()->getCell($cell));
				//get cell value
				return $objCell->getvalue();
			}
			
			function pp(&$var){
				$var = chr(ord($var)+1);
				return true;
			}
	
			$name	  = $_FILES['file']['name'];
			$tname 	  = $_FILES['file']['tmp_name'];
			$type 	  = $_FILES['file']['type'];
				
			if($type == 'application/vnd.ms-excel')
			{
				// Extension excel 97
				$ext = 'xls';
			}
			else if($type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
			{
				// Extension excel 2007 y 2010
				$ext = 'xlsx';
			}else{
				// Extension no valida
				echo -1;
				exit();
			}
		
			$xlsx = 'Excel2007';
			$xls  = 'Excel5';
	
			//creando el lector
			$objReader = PHPExcel_IOFactory::createReader($$ext);
			
			//cargamos el archivo
			$objPHPExcel = $objReader->load($tname);
		
			$dim = $objPHPExcel->getActiveSheet()->calculateWorksheetDimension();
		
			// list coloca en array $start y $end
			list($start, $end) = explode(':', $dim);
				
			if(!preg_match('#([A-Z]+)([0-9]+)#', $start, $rslt)){
				return false;
			}
			list($start, $start_h, $start_v) = $rslt;
			if(!preg_match('#([A-Z]+)([0-9]+)#', $end, $rslt)){
				return false;
			}
			list($end, $end_h, $end_v) = $rslt;
		
			//empieza  lectura vertical
			$table = "<table  border='1'>";
			for($v=$start_v; $v<=$end_v; $v++){
				//empieza lectura horizontal
				$table .= "<tr>";
				for($h=$start_h; ord($h)<=ord($end_h); pp($h)){
					$cellValue = get_cell($h.$v, $objPHPExcel);
					$table .= "<td>";
					if($cellValue !== null){
						$table .= $cellValue;
					}
					$table .= "</td>";
				}
				$table .= "</tr>";
			}
			$table .= "</table>";
			
			echo $table;		
		}
		?>
    </div>
</div>
	
</body>
</html>
