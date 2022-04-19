<?php
 

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 $QRCode = $obj['qrcode'];

 $query = "SELECT qrcode FROM fetchresults  WHERE qrcode = '$QRCode'";



 
 $result = pg_query($con, $query);

 if(pg_num_rows($result) >= 1) {

  $row = pg_fetch_array($result);


  $qrcode = array('qrcode' => $row["qrcode"]);
 

  echo json_encode($qrcode);
 
   
   }
   else {
    $qrcode = array('qrcode' => -1);
    echo json_encode($qrcode);
}

?>
