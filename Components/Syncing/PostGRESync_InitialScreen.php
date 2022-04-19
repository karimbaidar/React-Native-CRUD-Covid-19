<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=reactcrud user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate Student name from JSON $obj array and store into $S_Name.
 $S_Name = $obj['student_name'];
 
 // Populate Student Class from JSON $obj array and store into $S_Class.
 $S_Class = $obj['student_class'];
 
 // Populate Student Phone Number from JSON $obj array and store into $S_Phone_Number.
 $S_Phone_Number = $obj['student_phone_number'];
 
 // Populate Email from JSON $obj array and store into $S_Email.
 $S_Email = $obj['student_email'];


 $S_USER_ID = $obj['userid'];

 $S_FLAG_SYNC = $obj['flagsync'];



 $query = "SELECT * FROM synctable  WHERE student_name = '$S_Name' and student_class = '$S_Class'";
 $result = pg_query($con, $query);


 if(pg_num_rows($result) >= 1) {
   
      $SuccessLoginMsg = 'Data Matched';
 
   
      // Converting the message into JSON format.
     $SuccessLoginJson = json_encode($SuccessLoginMsg);
      
     // Echo the message.
      echo $SuccessLoginJson ; 
     
     }
     else{
 
      $query = "SELECT * FROM synctable  WHERE userid = '$S_USER_ID'";
      //$sql = "SELECT 'Email' FROM 'user_registration' WHERE 'email'='".$S_Email."'";
      $result = pg_query($con, $query);

      
      if(pg_num_rows($result) >= 1) 
      {
       
      
          // Creating SQL query and insert the record into PostGRE database table.
          $Sql_Query = "update synctable set student_name = '$S_Name', student_class = '$S_Class', student_phone_number= '$S_Phone_Number', student_email = '$S_Email', userid = '$S_USER_ID', flagsync = '$S_FLAG_SYNC' WHERE student_name = '$S_Name'";
          
     
         // IF you get any parsing error, always check variable data type in database first and then you can check. 

            if(pg_query($con,$Sql_Query)){
     
 
           // If the record inserted successfully then show the message.
           $MSG = 'Data SYNCED Successfully' ;
 
          // Converting the message into JSON format.
           $json = json_encode($MSG);
            
            // Echo the message.
            echo $json ;
 
             }
             else{
 
             echo 'Try Again';
            
            }
              

      }
      else{


          // Creating SQL query and insert the record into PostGRE database table.
          $Sql_Query = "insert into synctable (student_name,student_class,student_phone_number,student_email,userid,flagsync) values ('$S_Name','$S_Class','$S_Phone_Number','$S_Email','$S_USER_ID','$S_FLAG_SYNC')";
 
          // IF you get any parsing error, always check variable data type in database first and then you can check. 
 
             if(pg_query($con,$Sql_Query)){
      
  
             // If the record inserted successfully then show the message.
             $MSG = 'Data SYNCED Successfully' ;
  
             // Converting the message into JSON format.
             $json = json_encode($MSG);
             
             // Echo the message.
             echo $json ;
  
              }
              else{
  
                   echo 'Try Again';
                  
               }
              
             







      }

   }

?>
