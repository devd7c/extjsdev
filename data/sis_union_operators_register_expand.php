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
		
		$sql = "SELECT x.oprexpandid, x.operatorregisterid, x.adminresolutionid, x.oprexpandzonestart, x.oprexpandroutestart, x.oprexpandzonefinish, x.oprexpandroutefinish, x.last_update, ";
		$sql .= "o.syndicatename, a.adminresolutioncode, a.adminresolutiondate, a.adminresolutionlegal, a.adminresolutiontechnical, a.vehiclequantityid, q.vehiclequantitydescription FROM op_register_expand x ";
		$sql .= "inner join operator_register r on x.operatorregisterid = r.operatorregisterid inner join operator o on r.operatorid = o.operatorid inner join administrative_resolution a on x.adminresolutionid = a.adminresolutionid inner join vehicle_quantity q on a.vehiclequantityid = q.vehiclequantityid limit $limit offset $start";
		//$sql = "SELECT * FROM op_register_expand limit $limit offset $start";
		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM op_register_expand");
		$res=$total->fetch_assoc();

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelOperatorsRegisterExpand" => $result,
			"total" => $res['total']
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO op_register_expand (oprexpandid, adminresolutionid, operatorregisterid, oprexpandroutefinish, oprexpandroutestart, oprexpandzonefinish, oprexpandzonestart) ";
		$query .= "VALUES (NULL,'".$data->adminresolutionid."', '".$data->operatorregisterid."', '".$data->oprexpandroutefinish."', '".$data->oprexpandroutestart."', '".$data->oprexpandzonefinish."', '".$data->oprexpandzonestart."')";
		if ($resultDb = $mysqli->query($query)) {
			$oprexpandid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE op_register_expand SET  adminresolutionid='".$data->adminresolutionid."',operatorregisterid='".$data->operatorregisterid."',oprexpandroutefinish='".$data->oprexpandroutefinish."',oprexpandroutestart='".$data->oprexpandroutestart."',oprexpandzonefinish='".$data->oprexpandzonefinish."',oprexpandzonestart='".$data->oprexpandzonestart.
			   "' WHERE oprexpandid=".$data->oprexpandid;
		if ($resultDb = $mysqli->query($query)) {
			$oprexpandid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM op_register_expand WHERE oprexpandid=".$data->oprexpandid;
		if ($resultDb = $mysqli->query($query)) {
			$oprexpandid = $mysqli->insert_id;
		}
	break;

}


