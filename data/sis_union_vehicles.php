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
		
		$sql = "SELECT * FROM vehicle_quantity limit $limit offset $start";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}
			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM vehicle_quantity");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelVehicles" => $result,
			"total" => $res['total']
		));
		/* close connection */
		$mysqli->close();
	break;
	/*case 'insert':
		$data=json_decode($_POST['data'])[0];

		$query = "INSERT INTO vehicle (vehicleid, propietaryid, vehiclecapacity, vehiclecategory, vehiclechasis, vehicleclass, vehiclebrand, vehicleregistrationnumber, vehiclemodel, vehiclelicense) ";
		$query .= "VALUES (NULL,'".$data->propietaryid."', '".$data->vehiclecapacity."', '".$data->vehiclecategory."', '".$data->vehiclechasis."', '".$data->vehicleclass."', '".$data->vehiclebrand."', '".$data->vehicleregistrationnumber."', '".$data->vehiclemodel."', '".$data->vehiclelicense."')";
		if ($resultDb = $mysqli->query($query)) {
			$operatorid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE vehicle SET  propietaryid='".$data->propietaryid."',vehiclecapacity='".$data->vehiclecapacity."',vehiclecategory='".$data->vehiclecategory."',vehiclechasis='".$data->vehiclechasis."',vehicleclass='".$data->vehicleclass."',vehiclebrand='".$data->vehiclebrand."',vehicleregistrationnumber='".$data->vehicleregistrationnumber."',vehiclemodel='".$data->vehiclemodel."',vehiclelicense='".$data->vehiclelicense.
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
	break;*/

}


