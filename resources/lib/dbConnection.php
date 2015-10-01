<?php
//$server = "192.168.0.11";
$server = "127.0.0.1";
$user = "root";
$pass = "root";
$dbName = "unionextjs";

$conection = mysql_connect($server,$user,$pass) or die (mysql_error());
$database = mysql_select_db($dbName, $conection) or die(mysql_error());

?>