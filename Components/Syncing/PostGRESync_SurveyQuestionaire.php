<?php
 
// Connecting to PostGRE Database.

 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 

 
 $S_Question = $obj['question'];
 $S_Type = $obj['type'];
 $S_Number = $obj['number'];
 $S_UserID = $obj['userid'];
 $S_ID = $obj['surveyid'];
 



 $Sql_Query = "insert into surveyquestionaire (question,type,number,surveyid,userid) values ('$S_Question','$S_Type',' $S_Number','$S_ID','$S_UserID')";
 

 // IF you get any parsing error, always check variable data type in database first and then you can check. 

if(pg_query($con,$Sql_Query)){
     
 
    // If the record inserted successfully then show the message.
    $MSG = 'Survey Question Created Successfully' ;  
 
    $query_QID = "SELECT qid FROM surveyquestionaire";
    
    $result = pg_query($con, $query_QID);
    if(pg_num_rows($result) >= 1) {

      $row = pg_fetch_array($result);
      $qid = array('qid' => $row["qid"]);
      echo json_encode($qid);


    }

    else{
     
         $qid = array('qid' => -1);
         echo json_encode($qid);
    }
 
 }
 else{
 
    echo 'Try Again';
 
 } 

?>
