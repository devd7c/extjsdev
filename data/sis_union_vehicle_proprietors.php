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
		$sql = "SELECT * FROM vehicle";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelProprietors" => $result
		));

		/* close connection */
		$mysqli->close();
		break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO vehicle (vehicleid, propietaryid) ";
		$query .= "VALUES (NULL,'".$data->propietaryID./*"', '".$data->propietarylastname."', '".$data->propietaryci."', '".$data->propietaryadress."', '".$data->propietaryphone.*/"')";
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE vehicle SET  propietaryid='".$data->propietaryID./*"',propietarylastname='".$data->propietarylastname."',propietaryci='".$data->propietaryci."',propietaryadress='".$data->propietaryadress."',propietaryphone='".$data->propietaryphone.*/
			   "' WHERE vehicleid=".$data->vehicleid;
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM vehicle WHERE vehicleid=".$data->vehicleid;
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}
	break;

}


