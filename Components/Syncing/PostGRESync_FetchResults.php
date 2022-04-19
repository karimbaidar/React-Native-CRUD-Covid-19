<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 $QRCode = $obj['qrcode'];

 $query = "SELECT labidn,measurement_type,measurement_subtype,result,ratio,date,comment FROM fetchresults  WHERE qrcode = '$QRCode'";


 $result = pg_query($con, $query);

 if(pg_num_rows($result) >= 1) {

  $row = pg_fetch_array($result);


  $qrcode = array('labidn' => $row["labidn"]);
  $qrcode += array('measurement_type' => $row["measurement_type"]);
  $qrcode += array('measurement_subtype' => $row["measurement_subtype"]);
  $qrcode += array('result' => $row["result"]);
  $qrcode += array('ratio' => $row["ratio"]);
  $qrcode += array('date' => $row["date"]);
  $qrcode += array('comment' => $row["comment"]);
  


  echo json_encode($qrcode);
 
   
   }
   else {
    $qrcode = array('qrcode' => -1);
    echo json_encode($qrcode);
}

?>
