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
		
		$sql = "SELECT v.vehicleid, v.propietaryid, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, v.last_update, ";
		$sql .= "v.vehiclebrand, v.vehiclestatus, v.vehiclemodel, v.vehiclelicense, v.picture, p.propietaryci, p.propietaryfirstname, p.propietarylastname, p.operatorregisterid, o.syndicatename, o.operatormatrix FROM vehicle v ";
		$sql .= "inner join propietary p on v.propietaryid = p.propietaryid inner join operator_register r on p.operatorregisterid = r.operatorregisterid inner join operator o on r.operatorid = o.operatorid limit $limit offset $start";
		//$sql = "SELECT * FROM vehicle";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}
			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM vehicle");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelVehicleProprietors" => $result,
			"total" => $res['total']
		));
		/* close connection */
		$mysqli->close();
	break;
	case 'readValidROP':
		$sql = "SELECT v.vehicleid, v.propietaryid, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, v.vehiclebrand, v.vehiclestatus, v.last_update, ";
		$sql .= "v.vehiclemodel, v.vehiclelicense, v.picture, p.propietaryci, p.propietaryfirstname, p.propietarylastname, p.operatorregisterid FROM vehicle v ";
		$sql .= "inner join propietary p on v.propietaryid = p.propietaryid WHERE v.vehiclestatus = 'NO'";
		//$sql = "SELECT * FROM vehicle";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}
			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM vehicle WHERE vehiclestatus = 'NO'");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelVehicleProprietors" => $result,
			"total" => $res['total']
		));
		/* close connection */
		$mysqli->close();
	break;
	case 'readValidTemp':
		$sql = "SELECT v.vehicleid, v.propietaryid, v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, v.vehiclebrand, v.vehiclestatus, v.last_update, ";
		$sql .= "v.vehiclemodel, v.vehiclelicense, v.picture, p.propietaryci, p.propietaryfirstname, p.propietarylastname, p.operatorregisterid FROM vehicle v ";
		$sql .= "inner join propietary p on v.propietaryid = p.propietaryid WHERE v.vehiclestatus = 'NO' AND p.operatorregisterid = 1";
		//$sql = "SELECT * FROM vehicle";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}
			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM vehicle v inner join propietary p on v.propietaryid = p.propietaryid WHERE v.vehiclestatus = 'NO' AND p.operatorregisterid = 1");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelVehicleProprietors" => $result,
			"total" => $res['total']
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

		/*$query = "DELETE FROM infraction_register WHERE vehicleid=".$data->vehicleid;
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}
		
		$query = "DELETE FROM card_operation WHERE vehicleid=".$data->vehicleid;
		if ($resultDb = $mysqli->query($query)) {
			$vehicleid = $mysqli->insert_id;
		}*/
	break;

}


