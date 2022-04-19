<?php

// Connecting to PostGRE Database.

$con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json, true);


// Populate Student Class from JSON $obj array and store into $S_Class.
$S_Username = $obj['usernameTouch'];

$query = "SELECT username FROM users  WHERE username = '$S_Username'";

$result = pg_query($con, $query);

if (pg_num_rows($result) >= 1) {

    $row = pg_fetch_array($result);
    $username = array('username' => $row["username"]);
    echo json_encode($username);

} else {
    $username = array('username' => -1);
    echo json_encode($username);
}
