<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 
 // Populate Student Class from JSON $obj array and store into $S_Class.
 $S_Username = $obj['username_1'];

 
 // Populate Student Phone Number from JSON $obj array and store into $S_Phone_Number.
 $S_Email = $obj['email_1'];
 
 // Populate Email from JSON $obj array and store into $S_Email.
 $S_Password = $obj['password_1'];



 $query = "SELECT username FROM users  WHERE username = '$S_Username'";
 //$sql = "SELECT 'Email' FROM 'user_registration' WHERE 'email'='".$S_Email."'";
 $result = pg_query($con, $query);

 if(pg_num_rows($result) >= 1) {
 //if (isset($result)) {
 
   $EmailExistMSG = 'Username Already Exist, Please Try Again !!!';
   
   // Converting the message into JSON format.
   $EmailExistJson = json_encode($EmailExistMSG);
   
  // Echo the message.
  
   echo $EmailExistJson ; 
   
   }
   else{
 
 $Sql_Query = "insert into users (username,email,password) values ('$S_Username','$S_Email','$S_Password')";
 

 // IF you get any parsing error, always check variable data type in database first and then you can check. 
if(pg_query($con,$Sql_Query)){
     
 
    // If the record inserted successfully then show the message.
    $MSG = 'User Registered Successfully' ;  
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
    
 
    // Echo the message.
    echo $json ;
 
 }
 else{
 
    echo 'Try Again';
 
 } }

?>
