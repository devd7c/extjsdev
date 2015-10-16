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
		$sql = "SELECT i.infractionregisterid, i.infractionid, i.vehicleid, i.infractionnumberticket, ";
		$sql .= "i.infractionregisterstate, n.descriptioninfraction, n.amountinfraction FROM infraction_register i ";
		$sql .= "inner join infraction n on i.infractionid = n.infractionid";
		
		//$sql = "SELECT * FROM infraction_register";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelInfractionsRegister" => $result
		));

		/* close connection */
		$mysqli->close();
		break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO infraction_register (infractionregisterid, infractionid, vehicleid, infractionnumberticket, infractionregisterstate) ";
		$query .= "VALUES (NULL,'".$data->infractionid."', '".$data->vehicleid."', '".$data->infractionnumberticket."', '".$data->infractionregisterstate."')";
		if ($resultDb = $mysqli->query($query)) {
			$infractionregisterid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE infraction_register SET  infractionid='".$data->infractionid."',vehicleid='".$data->vehicleid."',infractionnumberticket='".$data->infractionnumberticket."',infractionregisterstate='".$data->infractionregisterstate.
			   "' WHERE infractionregisterid=".$data->infractionregisterid;
		if ($resultDb = $mysqli->query($query)) {
			$infractionregisterid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM infraction_register WHERE infractionregisterid=".$data->infractionregisterid;
		if ($resultDb = $mysqli->query($query)) {
			$infractionregisterid = $mysqli->insert_id;
		}
	break;

}


