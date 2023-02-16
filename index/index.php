<?php

if(isset($_GET["k"]) && !empty($_GET["k"])){
        
        $k = str_replace(' ', '', $_GET["k"]);;
        
        $file_location = "../static/pages/".strtolower($k).".html";
        
        include $file_location;


        $to = "email@domain.com, email@domain.com";
        $subject = "User has clicked";

        $message = '
          <html>
          <head>
              <title>Clicked</title>
          </head>
          <body>
            <h1 style="text-align:center">'.$_GET["utm_source"].'</h1>
            <h1 style="text-align:center">'.$_GET["k"].'</h1>
          </body>
          </html>
        ';


        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        $headers .= 'From: <email@domain.tech>' . "\r\n";
        $headers .= 'Cc: email@domain.tech' . "\r\n";

        mail($to, $subject, $message, $headers);
  exit();
}
?>

<html>
  <head>
  	<title>Page Not Found | FakeCoder.Tech</title>
  </head>
  <body>
    <h1 style="text-align:center; margin-top: 150px;"><a href="/">go Home</a></h1>
  </body>
</html>




