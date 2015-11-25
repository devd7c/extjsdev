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
		
		$sql = "SELECT u.address, u.email, u.name, u.password, u.userid, u.username, u.last_update, ";
		$sql .= "u.phone, u.picture, u.privilegesid, g.privilegesdescription FROM user u ";
		$sql .= "inner join privileges g on u.privilegesid = g.privilegesid limit $limit offset $start";
		//$sql = "SELECT * FROM user";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM user");
		$res=$total->fetch_assoc();
		
		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelUser" => $result,
			"total" => $res['total']
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'readPrivileges':
		/*$sql = "SELECT u.address, u.email, u.name, u.password, u.userid, u.username, ";
		$sql .= "u.phone, u.picture, u.privilegesid, g.privilegesdescription FROM user u ";
		$sql .= "inner join privileges g on u.privilegesid = g.privilegesid";*/
		$sql = "SELECT * FROM privileges";

		$result = array();

		if ($resultDb = $mysqli->query($sql)) {

			while($record = $resultDb->fetch_assoc()) {
				array_push($result, $record);
			}

			$resultDb->close();
		}
		
		$total = $mysqli->query("SELECT COUNT(*) as total FROM privileges");
		$res=$total->fetch_assoc();

		echo json_encode(array(
			"success" => $mysqli->connect_errno == 0,
			"modelUser" => $result,
			"total" => $res['total']
		));

		/* close connection */
		$mysqli->close();
	break;
	case 'insert':
		$data=json_decode($_POST['data'])[0];
		
		$query = "INSERT INTO user (userid, username, privilegesid, phone, password, name, email, address, picture) ";
		$query .= "VALUES (NULL,'".$data->username."', '".$data->privilegesid."', '".$data->phone."', '".$data->password."', '".$data->name."', '".$data->email."', '".$data->address."', '".$data->picture."')";
		if ($resultDb = $mysqli->query($query)) {
			$userid = $mysqli->insert_id;
		}
	break;
	case 'update':
		$data=json_decode($_POST['data'])[0];
		$query = "UPDATE user SET  username='".$data->username."',privilegesid='".$data->privilegesid."',phone='".$data->phone."',password='".$data->password."',name='".$data->name."',email='".$data->email."',address='".$data->address."',picture='".$data->picture.
			   "' WHERE userid=".$data->userid." AND ".$data->userid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$userid = $mysqli->insert_id;
		}
	break;
	case 'destroy':
		$data=json_decode($_POST['data'])[0];
		$query = "DELETE FROM user WHERE userid=".$data->userid." AND ".$data->userid."!=1";
		if ($resultDb = $mysqli->query($query)) {
			$userid = $mysqli->insert_id;
		}
	break;

}


