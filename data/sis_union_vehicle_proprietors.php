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
		$sql = "SELECT v.vehicleid, v.propietaryid, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, ";
		$sql .= "v.vehiclebrand, v.vehiclestatus, v.vehiclemodel, v.vehiclelicense, p.propietaryci, p.propietaryfirstname, p.propietarylastname, p.operatorregisterid FROM vehicle v ";
		$sql .= "inner join propietary p on v.propietaryid = p.propietaryid";
		//$sql = "SELECT * FROM vehicle";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}
			$resultDb->close();
		}
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelVehicleProprietors" => $result
		));
		/* close connection */
		$mysqli->close();
	break;
	case 'readValidROP':
		$sql = "SELECT v.vehicleid, v.propietaryid, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, v.vehiclebrand, v.vehiclestatus, ";
		$sql .= "v.vehiclemodel, v.vehiclelicense, p.propietaryci, p.propietaryfirstname, p.propietarylastname, p.operatorregisterid FROM vehicle v ";
		$sql .= "inner join propietary p on v.propietaryid = p.propietaryid WHERE v.vehiclestatus = 'NO'";
		//$sql = "SELECT * FROM vehicle";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}
			$resultDb->close();
		}
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelVehicleProprietors" => $result
		));
		/* close connection */
		$mysqli->close();
	break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];

		$query = "INSERT INTO vehicle (vehicleid, propietaryid, vehiclecapacity, vehiclecategory, vehiclechasis, vehicleclass, vehiclebrand, vehiclestatus, vehiclemodel, vehiclelicense) ";
		$query .= "VALUES (NULL,'".$data->propietaryid."', '".$data->vehiclecapacity."', '".$data->vehiclecategory."', '".$data->vehiclechasis."', '".$data->vehicleclass."', '".$data->vehiclebrand."', '".$data->vehiclestatus."', '".$data->vehiclemodel."', '".$data->vehiclelicense."')";
		if ($resultDb = $mysqli->query($query)) {
			$operatorid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE vehicle SET  propietaryid='".$data->propietaryid."',vehiclecapacity='".$data->vehiclecapacity."',vehiclecategory='".$data->vehiclecategory."',vehiclechasis='".$data->vehiclechasis."',vehicleclass='".$data->vehicleclass."',vehiclebrand='".$data->vehiclebrand."',vehiclestatus='".$data->vehiclestatus."',vehiclemodel='".$data->vehiclemodel."',vehiclelicense='".$data->vehiclelicense.
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


