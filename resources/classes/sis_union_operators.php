<?php
/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
ini_set('display_errors', true);
ini_set('html_errors', true);
require_once '../include.php';

class ModelCar {
	function __construct($operatorid, $syndicatename, $operatorcode) {
		$this->operatorid = $operatorid;
        $this->syndicatename = $syndicatename;
		$this->operatorcode = $operatorcode;
	}
}
class ModelCarsCollection {
	function __construct($modelCars) {
		$this->modelCars = $modelCars;
	}
}
function getModelCars() {
	
    //$ford = new ModelCar(1, 'Trucks and Buses', '1940 Ford Pickup Truck');
    //$chevy = new ModelCar(2, 'Trucks and Buses', '1957 Chevy Pickup');
	$queryString = "SELECT * FROM operator";
	$query = mysql_query($queryString) or die(mysql_error());
	$users = array();
	while($user = mysql_fetch_assoc($query)) {
	$users[] = new ModelCar($user['operatorid'], $user['syndicatename'], $user['operatorcode']);
	}
	//$collection = new ModelCarsCollection(array($ford,$chevy));
    $collection = new ModelCarsCollection($users);
	// TODO: Replace lines above with database call.
    
    return $collection;
}
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'];
$requestBody = file_get_contents('php://input');
$result = '';
switch ($method) {
    
	case 'GET':
    
		$result = getModelCars();
		header('Cache-Control: no-cache, must-revalidate');
		header('content-type:application/json');
		echo(json_encode($result));
		break;
	case 'POST':
    
		switch ($action) {
    
			case 'create':
            
				$modelCar = json_decode($requestBody);
				// TODO: Save $modelCar in the database.
            
				$result = array('success' => true, 'action' => 'create', 'modelCar' => $modelCar);
				
				header('Cache-Control: no-cache, must-revalidate');
				header('content-type:application/json');
				
				echo(json_encode($result));
    
			break;
    
			case 'update':
				$updatedData = json_decode($requestBody);
				@$operatorid = $updatedData->operatorid;
				@$syndicatename = $updatedData->syndicatename;
				//$operatorcode = $updatedData->operatorcode;
				//consulta sql
				$query = sprintf("UPDATE operator SET syndicatename = '%s' WHERE operatorid=%b",
					mysql_real_escape_string($syndicatename),
					//mysql_real_escape_string($operatorcode),
					mysql_real_escape_string($operatorid));
				$rs = mysql_query($query);
				
				// TODO: Save $updatedData in the database.
            
				$result = array('success' => true, 'action' => 'update', 'updatedData' => $updatedData);
				header('Cache-Control: no-cache, must-revalidate');
				header('content-type:application/json');
				
				echo(json_encode($result));
    
			break;
        
			case 'destroy':
        
				$deletedData = json_decode($requestBody);
				@$operatorid = $deletedData->operatorid;
				// TODO: Delete $deletedData from the database.
				
				$deleteQuery = "DELETE FROM operator WHERE operatorid='$operatorid'";
				$resultdb = mysql_query($deleteQuery);
				
				$result = array('success' => true, 'action' => 'destroy', 'deletedData' => $deletedData);
				header('Cache-Control: no-cache, must-revalidate');
				header('content-type:application/json');
				
				echo(json_encode($result));
        
			break;
    
		}
    
    break;
}
?>
