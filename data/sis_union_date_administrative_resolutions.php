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
		//$sql = "SELECT * FROM administrative_resolution";

		$sql = "SELECT a.adminresolutionid, a.adminresolutioncode, a.adminresolutiondate, a.adminresolutiontechnical, ";
		$sql .= "a.adminresolutionlegal, a.vehiclequantityid, v.vehiclequantitydescription FROM administrative_resolution a ";
		$sql .= "inner join vehicle_quantity v on a.vehiclequantityid = v.vehiclequantityid";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelAdministrativeResolutions" => $result
		));

		/* close connection */
		$mysqli->close();
		break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO administrative_resolution (adminresolutionid, adminresolutioncode, adminresolutiondate, adminresolutiontechnical, adminresolutionlegal, vehiclequantityid) ";
		$query .= "VALUES (NULL,'".$data->adminresolutioncode."','".$data->adminresolutiondate."','".$data->adminresolutiontechnical."','".$data->adminresolutionlegal."','".$data->vehiclequantityid."')";
		if ($resultDb = $mysqli->query($query)) {
			$adminresolutionid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE administrative_resolution SET  adminresolutioncode='".$data->adminresolutioncode."',adminresolutiondate='".$data->adminresolutiondate."',adminresolutiontechnical='".$data->adminresolutiontechnical."',adminresolutionlegal='".$data->adminresolutionlegal."',vehiclequantityid='".$data->vehiclequantityid.
			   "' WHERE adminresolutionid=".$data->adminresolutionid." AND ".$data->adminresolutionid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$adminresolutionid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM administrative_resolution WHERE adminresolutionid=".$data->adminresolutionid." AND ".$data->adminresolutionid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$adminresolutionid = $mysqli->insert_id;
		}
	break;

}


