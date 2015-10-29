<?php

require("dbConnection.php");

session_start();

//add session timeout handle
//add filter to verify is user can do this action

$vehicleid = $_POST['vehicleid'];
$uploads_dir = '../resources/vehicles';

if ($vehicleid == ""){
    $vehicleid = 0;
}

if(isset($_FILES)){

    $tmpName = $_FILES['picture']['tmp_name'];
    $fileName = $_FILES['picture']['name'];

    move_uploaded_file($tmpName, "$uploads_dir/$fileName");
}



    $updateQuery = "UPDATE vehicle SET ";
    if ($fileName != null) {
        $updateQuery .= "picture = '$fileName' ";
    }
    $updateQuery .= " WHERE vehicleid='$vehicleid'";

    $resultDb = $mysqli->query($updateQuery);


header('Content-type: text/html');

echo json_encode(array(
    "success" => $mysqli->error == '',
    "msg" => $mysqli->error,
    "vehicleid" => $vehicleid
));

/* close connection */
$mysqli->close();