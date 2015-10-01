<?php
/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
require_once '../include.php';
class sis_union_users 
{

	public function __construct() {
		
	}

	public function __call($option,$att) {
		$datos=$att[0];
		$yaction=$datos['yaction'];
		//echo $datos['xaction'];
		switch ($option)
		{
			case "read":

			$start = $_REQUEST['start'];
			$limit = $_REQUEST['limit'];
			$queryString = "SELECT * FROM user LIMIT $start,  $limit";
			$query = mysql_query($queryString) or die(mysql_error());
			$users = array();
			while($user = mysql_fetch_assoc($query)) {
				$users[] = $user;
			}
			$queryTotal = mysql_query('SELECT count(*) as num FROM user') or die(mysql_error());
			$row = mysql_fetch_assoc($queryTotal);
			$total = $row['num'];
			echo json_encode(array(
				"success" => mysql_errno() == 0,
				"total" => $total,
				"users" => $users
			));

			break;

			case 'update':
			$info = $_POST['users'];
				$data = json_decode(stripslashes($info));
				$nome = $data->name;
				$email = $data->email;
				$phone = $data->phone;
				$userid = $data->userid;
				//consulta sql
				$query = sprintf("UPDATE user SET name = '%s', email = '%s', phone = '%s' WHERE userid=%d",
					mysql_real_escape_string($nome),
					mysql_real_escape_string($email),
					mysql_real_escape_string($phone),
					mysql_real_escape_string($userid));
				$rs = mysql_query($query);
				echo json_encode(array(
					"success" => mysql_errno() == 0,
					"users" => array(
						"userid" => $userid,
						"name" => $nome,
						"email" => $email,
						"phone" => $phone
					)
				));
			break;
		}
	}
}

$xaction=$_POST['xaction'];
 
$item=new sis_union_users();
$item->$xaction($_POST);
?>
