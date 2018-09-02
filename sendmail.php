<?php
	$SITE_TITLE = 'Один день в спецназе';
	$SITE_DESCR = '';


	if ( isset($_POST) ) {
		$subject = htmlspecialchars(trim($_POST['subject']));
		$name = htmlspecialchars(trim($_POST['name']));
		$phone = htmlspecialchars(trim($_POST['phone']));

		$to = 'Elena357910@yandex.com';

		$headers = "From: $SITE_TITLE \r\n";
		//$headers .= "Reply-To: ". $email . "\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		$data = '<h1>'.$subject."</h1>";
		$data .= 'Имя: '.$name."<br>";
		$data .= 'Телефон: '.$phone."<br>";

		$message = "<div style='background:#F5F5F5;border-radius:10px;padding:20px;'>
				".$data."
				<br>\n
				<hr>\n
				<br>\n
				<small>This message was sent by the user from the ".$SITE_TITLE." site. Respond to the message itself is not necessary.</small>\n</div>";
		$send = mail($to, $subject, $message, $headers);

		if ( $send ) {
			echo 'success';
		} else {
			echo '<div class="error">error</div>';
		}

	}
	else {
			echo '<div class="error">error</div>';
	}
	die();
?>