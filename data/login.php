<?php

require("dbConnection.php");
//require("PassHash.php");

session_start();

// username and password sent from form 
$userName = $_POST['user'];
$pass = $_POST['password'];

// To protect MySQL injection (more detail about MySQL injection)
$userName = stripslashes($userName);
$pass = stripslashes($pass);

$userName = $mysqli->real_escape_string($userName);
$pass = $mysqli->real_escape_string($pass);

//$sql = "SELECT * FROM user WHERE userName='$userName'";

$sql = "SELECT u.address, u.email, u.name, u.password, u.phone, u.picture, u.userid, u.username, u.privilegesid, r.privilegesdescription FROM user u ";
$sql .= "inner join privileges r on u.privilegesid = r.privilegesid WHERE u.userName='$userName'";

$result = array();

if ($resultDb = $mysqli->query($sql)) {

    // determine number of rows result set
    $count = $resultDb->num_rows;

    // If result matched $userName and $pass, table row must be 1 row
    if($count==1){

        $record = $resultDb->fetch_assoc();
//        if (PassHash::check_password($record['password'],$pass)){
        if ($record['password']==$pass){
            $_SESSION['authenticated'] = "yes";
            $_SESSION['username'] = $userName;

            $result = array ("success" => true, "data" => array($record['name'], $record['privilegesid'], $record['privilegesdescription']));
            //$result['msg'] = 'Welcome!!!';

        } else{
            $result['success'] = false;
            $result['msg'] = 'Incorrect password.';
        }

    } else {

        $result['success'] = false;
        $result['msg'] = 'Incorrect user or password.';
    }

    /* close result set */
    $resultDb->close();
}

/* close connection */
$mysqli->close();

//JSON encoding
echo json_encode($result);
?>
