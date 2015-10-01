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
		$sql = "SELECT * FROM operator";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelCars" => $result
		));

		/* close connection */
		$mysqli->close();
		break;

	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE operator SET  syndicatename='".$data->syndicatename."',operatorcode='".$data->operatorcode.
			   "' WHERE operatorid=".$data->operatorid;
		if ($resultDb = $mysqli->query($query)) {
			$operatorid = $mysqli->insert_id;
		}
		break;

}


