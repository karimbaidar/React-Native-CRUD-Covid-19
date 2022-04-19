<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate Student name from JSON $obj array and store into $S_Name.
 $S_atc = $obj['student_name'];
 
 // Populate Student Phone Number from JSON $obj array and store into $S_Phone_Number.
 $S_date = $obj['student_phone_number'];
 
 // Populate Email from JSON $obj array and store into $S_Email.
 $S_pzn = $obj['student_class'];


 $S_USER_ID = $obj['userid'];


      $Sql_Query = "insert into history (atc,pzn,userid,currenttime) values ('$S_atc','$S_pzn','$S_USER_ID','$S_date')";
 
      // IF you get any parsing error, always check variable data type in database first and then you can check. 
      if(pg_query($con,$Sql_Query)){
     
 
      // If the record inserted successfully then show the message.
      $MSG = 'INSERTED INTO HISTORY TABLE Successfully' ;  
 
      // Converting the message into JSON format.
       $json = json_encode($MSG);
    
 
    // Echo the message.
    echo $json ;
 
   }
   else{ 
 
     echo 'Try Again';
 
   } 

?>
