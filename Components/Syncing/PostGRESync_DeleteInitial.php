<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=reactcrud user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate Student ID from JSON $obj array and store into $S_ID.
 $S_ID = $obj['student_id'];
 
 // Creating SQL query and Updating the current record into MySQL database table.
 $query = "DELETE FROM synctable WHERE userid = '$S_ID'" ;


 $result = pg_query($con, $query);


 if($result){
 
   // If the record inserted successfully then show the message.
  $MSG = 'Record Deleted Successfully.' ;
   
  // Converting the message into JSON format.
  $json = json_encode($MSG);
   
  // Echo the message.
   echo $json ;
   
   }
   else{
   
   echo 'Try Again';
   
   }

   

?>
