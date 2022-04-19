<?php
include 'DBConfig_AutocompleteSearch.php';
 


// Create connection
$conn = pg_connect("host=localhost dbname=reactcrud user=postgres password=ASd___123");
 
$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$name = $obj['name'];


$sql = "SELECT student_name FROM synctable WHERE userid = '$name'";

$result = pg_query($conn, $sql);
 
   if(pg_num_rows($result) >= 1) {
 
    while($row[] =  pg_fetch_assoc($result)) {

   
     $tem = $row;
 
     $json = json_encode($tem);
 
 
 
      }
      echo $json;
 
   } else {
        // If the record inserted successfully then show the message.
     $InvalidMSG = 'No Record Found' ;
      
     // Converting the message into JSON format.
     $InvalidMSGJSon = json_encode($InvalidMSG);
      
     // Echo the message.
      echo $InvalidMSGJSon ;
   }
     

?>