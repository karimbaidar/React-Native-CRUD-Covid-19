<?php
 
 $con = pg_connect("host=localhost dbname=baidar user=postgres password=ASd___123");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 

 
 $S_SurveyName = $obj['surveyname'];
 $S_UserID = $obj['userid'];
 



 $Sql_Query = "insert into survey (surveyname,userid) values ('$S_SurveyName','$S_UserID')";
 

 // IF you get any parsing error, always check variable data type in database first and then you can check. 

if(pg_query($con,$Sql_Query)){
     
 
    // If the record inserted successfully then show the message.
    $MSG = 'Survey Created Successful' ;  


    $query_surveyID = "SELECT surveyid FROM survey";
    
    $result = pg_query($con, $query_surveyID);
    if(pg_num_rows($result) >= 1) {

      $row = pg_fetch_array($result);
      $surveyid = array('surveyid' => $row["surveyid"]);
      echo json_encode($surveyid);


    }

    else{
     
         $surveyid = array('username' => -1);
         echo json_encode($surveyid);
    }




 
    // Converting the message into JSON format.
   // $json = json_encode($MSG);
    
 
    // Echo the message.
   // echo $json ;
 
 }
 else{
 
    echo 'Try Again';
 
 } 

?>
