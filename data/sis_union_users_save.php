<?php

require("dbConnection.php");

session_start();

$userid = $_POST['userid'];
$address = $_POST['address'];
$email = $_POST['email'];
$name = $_POST['name'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$privilegesid = $_POST['privilegesid'];
$username = $_POST['username'];
$uploads_dir = '../resources/users';

if ($userid == ""){
    $userid = 0;
}

if(isset($_FILES)){

    $tmpName = $_FILES['picture']['tmp_name'];
    $fileName = $_FILES['picture']['name'];

    move_uploaded_file($tmpName, "$uploads_dir/$fileName");
}

if ($userid ==  0) {

    $insertQuery = "INSERT INTO user (address, email, name, password, phone, picture, privilegesid, username) ";
    $insertQuery .= "VALUES ('$address', '$email', '$name', '$password', '$phone', '$fileName', '$privilegesid', '$username')";

    if ($resultDb = $mysqli->query($insertQuery)) {
        $userid = $mysqli->insert_id;
    }
} else {

    $updateQuery = "UPDATE user SET ";
    $updateQuery .= "address = '$address', ";
    $updateQuery .= "email = '$email', ";
    $updateQuery .= "name = '$name', ";
	$updateQuery .= "password = '$password', ";
	$updateQuery .= "phone = '$phone', ";
	$updateQuery .= "username = '$username', ";
    if ($fileName != null) {
        $updateQuery .= "picture = '$fileName', ";
    }
    $updateQuery .= "privilegesid = '$privilegesid' ";
    $updateQuery .= " WHERE userid='$userid' AND userid!=1";

    $resultDb = $mysqli->query($updateQuery);
}

header('Content-type: text/html');

echo json_encode(array(
    "success" => $mysqli->error == '',
    "msg" => $mysqli->error,
    "userid" => $userid
));
$mysqli->close();