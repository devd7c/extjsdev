<?php
/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
//ini_set('display_errors', true);
//ini_set('html_errors', true);
//require_once 'dbConnection.php';
require("dbConnection.php");
session_start();

$action = $_POST['action'];

switch($action){
	case 'read':
		$start=$_POST['start'];
        $limit=$_POST['limit'];
		
		$sql = "SELECT * FROM infraction limit $limit offset $start";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM infraction");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelInfractions" => $result,
			"total" => $res['total']
		));

		/* close connection */
		$mysqli->close();
		break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO infraction (infractionid, descriptioninfraction, amountinfraction) ";
		$query .= "VALUES (NULL,'".$data->descriptioninfraction."', '".$data->amountinfraction."')";
		if ($resultDb = $mysqli->query($query)) {
			$infractionid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE infraction SET  descriptioninfraction='".$data->descriptioninfraction."',amountinfraction='".$data->amountinfraction.
			   "' WHERE infractionid=".$data->infractionid;
		if ($resultDb = $mysqli->query($query)) {
			$infractionid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM infraction WHERE infractionid=".$data->infractionid;
		if ($resultDb = $mysqli->query($query)) {
			$infractionid = $mysqli->insert_id;
		}
	break;

}


