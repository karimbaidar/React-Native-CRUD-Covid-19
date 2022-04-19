<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 

 
 $S_atc = $obj['atc'];
 $S_pzn = $obj['pzn'];
 $S_name = $obj['name'];
 $S_manufact_code = $obj['manufact_code'];
 $S_darrform_code = $obj['darrform_code'];
 $S_pack_size = $obj['pack_size'];
 $S_dddpk = $obj['dddpk'];
 $S_appliform_code = $obj['appliform_code'];
 $S_flagInsertion = $obj['flagInsertion'];
 $S_userID = $obj['userID'];
 



 $Sql_Query = "insert into stamm (atc,pzn,name,manufact_code,darrform_code,pack_size,dddpk,appliform_code,flaginsertion,userid) values ('$S_atc','$S_pzn','$S_name','$S_manufact_code','$S_darrform_code','$S_pack_size','$S_dddpk','$S_appliform_code','$S_flagInsertion','$S_userID')";
 

 // IF you get any parsing error, always check variable data type in database first and then you can check. 

if(pg_query($con,$Sql_Query)){
     
 
    // If the record inserted successfully then show the message.
    $MSG = 'Insertion Successful into Stamm Table' ;  
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
    
 
    // Echo the message.
    echo $json ;
 
 }
 else{
 
    echo 'Try Again';
 
 } 

?>
