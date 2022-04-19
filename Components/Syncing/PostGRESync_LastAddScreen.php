<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 

 
 $S_verordnet = $obj['verordnet'];
 $S_bedarf = $obj['bedarf'];
 $S_personalich_angaben_morgen = $obj['Personalich_Angaben_Morgen'];
 $personalich_angaben_mittag = $obj['Personalich_Angaben_Mittag'];
 $personalich_angaben_abend = $obj['Personalich_Angaben_Abend'];
 $personalich_angaben_nacht = $obj['Personalich_Angaben_Nacht'];
 $interval_der_tagesdosen = $obj['interval_der_tagesdosen'];
 $duration_of_dosage = $obj['duration_of_dosage'];
 $doseseinheit = $obj['Doseseinheit'];
 $haufigkeit = $obj['Haufigkeit'];
 $bemerkungen = $obj['bemerkungen'];
 $userid = $obj['userID'];




 $Sql_Query = "insert into mp_items (verordnet,bedarf,personalich_angaben_morgen,personalich_angaben_mittag,personalich_angaben_abend,personalich_angaben_nacht,interval_der_tagesdosen,duration_of_dosage,doseseinheit,haufigkeit,bemerkungen,userid) values ('$S_verordnet','$S_bedarf','$S_personalich_angaben_morgen','$personalich_angaben_mittag','$personalich_angaben_abend','$personalich_angaben_nacht','$interval_der_tagesdosen','$duration_of_dosage','$doseseinheit','$haufigkeit','$bemerkungen','$userid')";
 

 // IF you get any parsing error, always check variable data type in database first and then you can check. 

if(pg_query($con,$Sql_Query)){
     
 
    // If the record inserted successfully then show the message.
    $MSG = 'Insertion Successful into MP_Items Table' ;  
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
    
 
    // Echo the message.
    echo $json ;
 
 }
 else{
 
    echo 'Try Again';
 
 } 

?>
