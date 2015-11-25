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
		
		$sql = "SELECT * FROM operator limit $limit offset $start";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM operator");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelOperators" => $result,
			"total" => $res['total']
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'readvalid':
		$sql = "SELECT * FROM operator WHERE operatorstate = 'Valido'";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM operator WHERE operatorstate = 'Valido'");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelOperators" => $result,
			"total" => $res['total']
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO operator (operatorid, syndicatename, operatorcode, operatorstate, operatormatrix) ";
		$query .= "VALUES (NULL,'".$data->syndicatename."', '".$data->operatorcode."', '".$data->operatorstate."', '".$data->operatormatrix."')";
		if ($resultDb = $mysqli->query($query)) {
			$operatorid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE operator SET  syndicatename='".$data->syndicatename."',operatorcode='".$data->operatorcode."',operatorstate='".$data->operatorstate."',operatormatrix='".$data->operatormatrix.
			   "' WHERE operatorid=".$data->operatorid." AND ".$data->operatorid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$operatorid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM operator WHERE operatorid=".$data->operatorid." AND ".$data->operatorid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$operatorid = $mysqli->insert_id;
		}
	break;

}


