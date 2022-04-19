<?php
include 'DBConfig_AutocompleteSearch.php';
 


$conn = pg_connect("host=localhost dbname=reactcrud user=postgres password=ASd___123");
 
$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$name = $obj['name'];

$lower = strtolower($name);

$sql = "SELECT fruit_name FROM stamm  WHERE fruit_name LIKE concat('$lower','%') LIMIT 20";

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