<?php
include __DIR__ . '/../functions.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';
require '../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['token'])) {
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = $recaptcha_server_secret;
    $recaptcha_response = $_POST['token'];
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    try {
        if ($recaptcha->score < 0.5) {
            throw new Exception("Sorry! Looks like we couldn't verify you, please try again.");
        }

        $to = $admin_email;
        $email = $to;

        $subject = "Message from " . $site;

        $loanType = $_POST['loanType'];
        $borrowAmount = $_POST['borrowAmount'];
        $termyear = $_POST['termyear'];
        $loanCategory = $_POST['loanCategory'];
        $propertyUse = $_POST['propertyUse'];
        $fullname = $_POST['fullname'];
        $phone_number = $_POST['phone_number'];
        $email_address = $_POST['email_address'];

        $message = '<!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            table {
                                font-family: arial, sans-serif;
                                border-collapse: collapse;
                                width: 100%;
                            }
                            
                            td, th {
                                border: 1px solid #dddddd;
                                text-align: left;
                                padding: 8px;
                            }
                            
                            tr:nth-child(even) {
                                background-color: #dddddd;
                            }
                        </style>
                    </head>
                <body><table><tbody>' .
            '<tr>' .
            '<td>Full Name</td>' .
            '<td><b>' . strip_tags($fullname) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>Phone Number</td>' .
            '<td><b>' . strip_tags($phone_number) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>Email Address</td>' .
            '<td><b>' . strip_tags($email_address) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>Loan Type</td>' .
            '<td><b>' . strip_tags($loanType) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>What is the loan balance?</td>' .
            '<td><b>' . strip_tags($borrowAmount) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>What is your preferred loan term?</td>' .
            '<td><b>' . strip_tags($termyear) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>What is the category?</td>' .
            '<td><b>' . strip_tags($loanCategory) . '</b></td>' .
            '</tr>' .
            '<tr>' .
            '<td>How will this property be used?</td>' .
            '<td><b>' . strip_tags($propertyUse) . '</b></td>' .
            '</tr>' .
            '</tbody></table></body></html>';

            _phpmailer($to, $site, $subject, $message, $no_reply_email, "", "");

            header('location:./../thankyou');
    } catch (Exception $e) {
        echo '<script language="javascript">alert("' . $e->getMessage() . '")</script>';
        echo '<script language="javascript">history.go(-1);</script>';
    }
}

function _phpmailer($to_email, $site, $subject, $message, $no_reply_email, $cc, $bcc)
{
    $mail = new PHPMailer(true);

    try {
        $mail->IsSMTP();
        $mail->SMTPDebug = 0;
        $mail->SMTPAuth = TRUE;
        $mail->SMTPSecure = "ssl";
        $mail->Port     = 465;
        $mail->Username = "hello@loanoptions.ai";
        $mail->Password = "qnofgyotqpunhxpf";
        $mail->Host     = "smtp.gmail.com";
        $mail->Mailer   = "smtp";
        $mail->SetFrom($no_reply_email, $site);
        $mail->AddAddress($to_email);
        if ($cc != '') {
            $mail->addCC($cc);
        }
        if ($bcc != '') {
            $mail->addBCC($bcc);
        }
        $mail->Subject = $subject;
        $mail->WordWrap   = 80;
        $mail->MsgHTML($message);
        $mail->IsHTML(true);
        $mail->send();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
