<?php

$input1 = $_POST['input1'];
$input2 = $_POST['input2'];
$input3 = $_POST['input3'];
$input4 = $_POST['input4'];
$phone = $_POST['phone'];
$mes = $_POST['mes'];



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require_once './PHPMailer/src/Exception.php';
require_once './PHPMailer/src/PHPMailer.php';
require_once './PHPMailer/src/SMTP.php';
 
// Для более ранних версий PHPMailer
//require_once '/PHPMailer/PHPMailerAutoload.php';
 
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
 
$mail->Host = 'ssl://smtp.timeweb.ru';
$mail->Port = 465;
$mail->Username = 'info@365skillfeed.ru';
$mail->Password = 'kt4c8i8j2';
 
// От кого
$mail->setFrom('info@365skillfeed.ru', 'slabotochka');    
 
// Кому
$mail->addAddress('risingfalcon97@gmail.com', 'Иван Петров');
 
// Тема письма
$mail->Subject = 'Сообщение с квиза';
 
// Тело письма
$body = '<p><strong>
Вопрос 1: '.$input1.'<br> 
Вопрос 2: '.$input2.'<br> 
Вопрос 3: '.$input3.'<br> 
Скидка: '.$input4.'<br> 
Куда лучше сообщить стоимость: '.$mes.'<br> 
Телефон: '.$phone.'<br> 

</strong></p>';
$mail->msgHTML($body);
 

 
$mail->send();

if($mail) {
echo "Отправлено";
}
else {
   echo "Ошибка";

}


?>