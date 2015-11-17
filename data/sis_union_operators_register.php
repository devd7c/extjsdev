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
		$sql = "SELECT r.operatorregisterid, r.operatorid, r.adminresolutionid, r.operatorregisterzonestart, r.operatorregisterroutestart, r.operatorregisterzonefinish, r.operatorregisterroutefinish, r.operatorregisterstate, ";
		$sql .= "o.operatorcode, o.syndicatename, o.operatormatrix, a.adminresolutioncode, a.adminresolutiondate, a.adminresolutionlegal, a.adminresolutiontechnical, a.vehiclequantityid, q.vehiclequantitydescription FROM operator_register r ";
		$sql .= "inner join operator o on r.operatorid = o.operatorid inner join administrative_resolution a on r.adminresolutionid = a.adminresolutionid inner join vehicle_quantity q on a.vehiclequantityid = q.vehiclequantityid";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelOperatorsRegister" => $result
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'readvalid':
		$sql = "SELECT r.operatorid, r.operatorregisterid, o.operatorcode, o.syndicatename, o.operatormatrix FROM operator_register r inner join operator o on r.operatorid = o.operatorid WHERE r.operatorregisterstate = 'Activo'";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelOperatorsRegister" => $result
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO operator_register (operatorregisterid, adminresolutionid, operatorid, operatorregisterroutefinish, operatorregisterroutestart, operatorregisterstate, operatorregisterzonefinish, operatorregisterzonestart) ";
		$query .= "VALUES (NULL,'".$data->adminresolutionid."', '".$data->operatorid."', '".$data->operatorregisterroutefinish."', '".$data->operatorregisterroutestart."', '".$data->operatorregisterstate."', '".$data->operatorregisterzonefinish."', '".$data->operatorregisterzonestart."')";
		if ($resultDb = $mysqli->query($query)) {
			$operatorregisterid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE operator_register SET  adminresolutionid='".$data->adminresolutionid."',operatorid='".$data->operatorid."',operatorregisterroutefinish='".$data->operatorregisterroutefinish."',operatorregisterroutestart='".$data->operatorregisterroutestart."',operatorregisterstate='".$data->operatorregisterstate."',operatorregisterzonefinish='".$data->operatorregisterzonefinish."',operatorregisterzonestart='".$data->operatorregisterzonestart.
			   "' WHERE operatorregisterid=".$data->operatorregisterid." AND ".$data->operatorregisterid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$operatorregisterid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM operator_register WHERE operatorregisterid=".$data->operatorregisterid." AND ".$data->operatorregisterid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$operatorregisterid = $mysqli->insert_id;
		}
	break;

}


