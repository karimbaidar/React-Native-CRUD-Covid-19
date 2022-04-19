<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=reactcrud user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate Student name from JSON $obj array and store into $S_Name.
 $S_verordnet = $obj['student_name'];
 
 // Populate Student Phone Number from JSON $obj array and store into $S_Phone_Number.
 $S_bedarf = $obj['student_phone_number'];
 
 // Populate Email from JSON $obj array and store into $S_Email.
 $S_haufigkeit = $obj['student_email'];


 $S_USER_ID = $obj['userid'];

 $S_FLAG_SYNC = $obj['flagsync'];



 $query = "SELECT * FROM mp_items  WHERE verordnet = '$S_verordnet' and haufigkeit = '$S_haufigkeit'";
 $result = pg_query($con, $query);


 if(pg_num_rows($result) >= 1) {
      $SuccessLoginMsg = 'Data Matched';
 
     $SuccessLoginJson = json_encode($SuccessLoginMsg);
      
     // Echo the message.
      echo $SuccessLoginJson ; 
     
     }
     else{
 

      $query = "SELECT * FROM mp_items  WHERE userid = '$S_USER_ID'";
      $result = pg_query($con, $query);

      
      if(pg_num_rows($result) >= 1) 
      {
      
          // Creating SQL query and insert the record into PostGRE database table.
          $Sql_Query = "update mp_items set verordnet = '$S_verordnet', bedarf = '$S_bedarf', haufigkeit= '$S_haufigkeit', userid = '$S_USER_ID', flagsync = '$S_FLAG_SYNC' WHERE userid = '$S_USER_ID'";
          
     
         // IF you get any parsing error, always check variable data type in database first and then you can check. 

         if(pg_query($con,$Sql_Query)){
     
 
           // If the record inserted successfully then show the message.
           $MSG = 'Data Updated Successfully' ;
 
           // Converting the message into JSON format.
           $json = json_encode($MSG);
            
            // Echo the message.
            echo $json ;
 
             }
             else{
 
             echo 'Try Again';}
              

      }
      else{


          // Creating SQL query and insert the record into PostGRE database table.
          $Sql_Query = "insert into mp_items (verordnet,bedarf,haufigkeit,userid,flagsync) values ('$S_verordnet','$S_bedarf','$S_haufigkeit','$S_USER_ID','$S_FLAG_SYNC')";
 
          // IF you get any parsing error, always check variable data type in database first and then you can check. 
 
             if(pg_query($con,$Sql_Query)){
      
  
             // If the record inserted successfully then show the message.
             $MSG = 'Data Synced Successfully' ;
  
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
