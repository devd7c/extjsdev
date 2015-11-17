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
		//$sql = "SELECT * FROM card_operation";
		$sql = "SELECT c.cardoperationid, c.cardoperationstatus, c.cardoperationvalidity, c.nameprincipal, c.namesecretary, c.operatorregisterid, c.vehicleid, ";
		$sql .= "r.adminresolutionid, r.operatorregisterstate, ";
		$sql .= "v.vehiclebrand, v.vehiclestatus, v.vehiclemodel, v.vehiclelicense, v.picture, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, ";
		$sql .= "p.propietaryfirstname, p.propietarylastname, p.propietaryci, o.syndicatename, o.operatorstate, o.operatormatrix FROM  card_operation c ";
		$sql .= "inner join operator_register r on c.operatorregisterid = r.operatorregisterid inner join vehicle v on c.vehicleid = v.vehicleid ";
		$sql .="inner join propietary p on v.propietaryid = p.propietaryid inner join operator o on r.operatorid = o.operatorid";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelCardOperations" => $result
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'readvalid':
		$sql = "SELECT * FROM card_operation WHERE operatorstate = 'Valido'";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelCardOperations" => $result
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO card_operation (cardoperationid, operatorregisterid, vehicleid, cardoperationstatus, cardoperationvalidity, nameprincipal, namesecretary) ";
		$query .= "VALUES (NULL,'".$data->operatorregisterid."', '".$data->vehicleid."', '".$data->cardoperationstatus."', '".$data->cardoperationvalidity."', '".$data->nameprincipal."', '".$data->namesecretary."')";
		if ($resultDb = $mysqli->query($query)) {
			$cardoperationid = $mysqli->insert_id;
		}

		$query = "UPDATE vehicle SET  vehiclestatus='".$data->vehiclestatuscard.
			   "' WHERE vehicleid=".$data->vehicleid;
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE card_operation SET  operatorregisterid='".$data->operatorregisterid."',vehicleid='".$data->vehicleid."',cardoperationstatus='".$data->cardoperationstatus."',cardoperationvalidity='".$data->cardoperationvalidity."',nameprincipal='".$data->nameprincipal."',namesecretary='".$data->namesecretary.
			   "' WHERE cardoperationid=".$data->cardoperationid;
		if ($resultDb = $mysqli->query($query)) {
			$cardoperationid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE vehicle SET  vehiclestatus='NO' WHERE vehicleid=".$data->vehicleid;
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}
		
		$query = "DELETE FROM card_operation WHERE cardoperationid=".$data->cardoperationid;
		if ($resultDb = $mysqli->query($query)) {
			$cardoperationid = $mysqli->insert_id;
		}
	break;

}


