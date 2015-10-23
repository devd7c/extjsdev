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
		//$sql = "SELECT * FROM propietary";
		/*$sql = "SELECT i.infractionregisterid, i.infractionid, i.vehicleid, i.infractionnumberticket, ";
		$sql .= "i.infractionregisterstate, n.descriptioninfraction, n.amountinfraction, ";
		$sql .= "v.vehiclebrand, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, v.vehiclemodel, v.vehiclelicense, ";
		$sql .= "v.vehicleregistrationnumber, p.propietaryci, p.propietaryfirstname, p.propietarylastname FROM infraction_register i ";
		$sql .= "inner join infraction n on i.infractionid = n.infractionid inner join vehicle v on i.vehicleid = v.vehicleid inner join propietary p on v.propietaryid = p.propietaryid";*/

		$sql = "SELECT p.operatorregisterid, p.propietaryadress, p.propietaryci, p.propietaryfirstname, ";
		$sql .= "p.propietaryid, p.propietarylastname, p.propietaryphone, o.syndicatename FROM propietary p ";
		$sql .= "inner join operator_register r on p.operatorregisterid = r.operatorregisterid inner join operator o on r.operatorid = o.operatorid";
		
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
		
		$query = "INSERT INTO propietary (propietaryid, propietaryfirstname, propietarylastname, propietaryci, propietaryadress, propietaryphone, operatorregisterid) ";
		$query .= "VALUES (NULL,'".$data->propietaryfirstname."', '".$data->propietarylastname."', '".$data->propietaryci."', '".$data->propietaryadress."', '".$data->propietaryphone."', '".$data->operatorregisterid."')";
		if ($resultDb = $mysqli->query($query)) {
			$propietaryid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE propietary SET  propietaryfirstname='".$data->propietaryfirstname."',propietarylastname='".$data->propietarylastname."',propietaryci='".$data->propietaryci."',propietaryadress='".$data->propietaryadress."',propietaryphone='".$data->propietaryphone."',operatorregisterid='".$data->operatorregisterid.
			   "' WHERE propietaryid=".$data->propietaryid;
		if ($resultDb = $mysqli->query($query)) {
			$propietaryid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM propietary WHERE propietaryid=".$data->propietaryid;
		if ($resultDb = $mysqli->query($query)) {
			$propietaryid = $mysqli->insert_id;
		}
	break;

}


