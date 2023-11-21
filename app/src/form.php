<?php
include __DIR__ . '/../functions.php';

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

        $headers = "MIME-Version: 1.0\r\n" .
            "Content-type: text/html; charset=utf-8\r\n" .
            "From: " . $site . " <" . $no_reply_email . ">" . "\r\n" .
            // "Bcc: " . $bcc_email . "\r\n" .
            "Reply-To: " . $site . " <" . $email . ">" . "\r\n" .
            "X-Mailer: PHP/" . phpversion();
        $result = mail($to, $subject, $message, $headers);

        if ($result) {
            header('location:./../thankyou');
        } else {
            throw new Exception('Failed, please submit form again or call us directly.');
        }
    } catch (Exception $e) {
        echo '<script language="javascript">alert("' . $e->getMessage() . '")</script>';
        echo '<script language="javascript">history.go(-1);</script>';
    }
}
