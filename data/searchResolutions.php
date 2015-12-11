<?php

require("dbConnection.php");
require("extjsFunctions.php");

session_start();

$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];
$query = $_REQUEST['query'];

$sql = "SELECT * FROM administrative_resolution ";
$sql .= "WHERE adminresolutioncode LIKE '%" . $query . "%' OR ";
$sql .= "adminresolutionlegal LIKE '%" . $query . "%' ";
$sql .= "LIMIT $start,  $limit";

$result = array();

if ($resultDb = $mysqli->query($sql)) {

    while($record = $resultDb->fetch_assoc()) {

        array_push($result, $record);
    }

    $resultDb->close();
}

$sql = "SELECT count(*) as num FROM administrative_resolution ";
$sql .= "WHERE adminresolutioncode LIKE '%" . $query . "%' OR ";
$sql .= "adminresolutionlegal LIKE '%" . $query . "%' ";
$total = 0;
if ($resultDb = $mysqli->query($sql)) {

    $record = $resultDb->fetch_assoc();
    $total = $record['num'];

    $resultDb->close();
}

echo json_encode(array(
    "success" => $mysqli->connect_errno == 0,
    "total" => $total,
    "data" => $result
));

$mysqli->close();