<?php

require("dbConnection.php");

session_start();

//add session timeout handle
//add filter to verify is user can do this action

$cardoperationid = $_POST['cardoperationid'];
$cardoperationstatus = $_POST['cardoperationstatus'];
$vehicleid = $_POST['vehicleid'];

if ($cardoperationstatus == "Activo"){
    $updateQuery = "UPDATE card_operation SET cardoperationstatus='Baja' WHERE cardoperationid=".$cardoperationid;
    $resultDb = $mysqli->query($updateQuery);

	$query = "UPDATE vehicle SET  vehiclestatus='NO' WHERE vehicleid=".$vehicleid;
	$resultDb = $mysqli->query($query);
}else{
    $updateQuery = "UPDATE card_operation SET cardoperationstatus='Activo' WHERE cardoperationid=".$cardoperationid;
    $resultDb = $mysqli->query($updateQuery);
	
	$query = "UPDATE vehicle SET  vehiclestatus='SI' WHERE vehicleid=".$vehicleid;
	$resultDb = $mysqli->query($query);
}


header('Content-type: text/html');

echo json_encode(array(
    "success" => $mysqli->error == '',
    "msg" => $mysqli->error,
    "cardoperationid" => $cardoperationid,
	"cardoperationstatus" => $cardoperationstatus
));

/* close connection */
$mysqli->close();