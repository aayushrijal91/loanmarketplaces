<?php
include __DIR__ . '/env.php';

$site = "LoanMarketplaces";
// $SITE_URL = "http://localhost:3000/landing_pages/loanmarketplaces/app";
$SITE_URL = "http://loanmarketplaces.com.au";
$phone_number = "0432 406 340";
$admin_email = 'arijal@aiims.com.au';
$bcc_email = "";
$no_reply_email = 'info@loanmarketplaces.com.au';
$recaptcha_client_secret = $client_secret;
$recaptcha_server_secret = $server_secret;

$application_page = false;

function renderImg($filename, $folder, $classname = "")
{
    $filename_without_ext = preg_replace('/\\.[^.\\s]{3,4}$/', '', $filename);
    $src = "./assets/images/" . $folder . "/" . $filename;

    if (file_exists("./assets/images/" . $folder . "/" . $filename_without_ext . ".webp")) {
        $src = "./assets/images/" . $folder . "/" . $filename_without_ext . ".webp";
    }

    return "<img src=" . $src . " alt=" . $filename_without_ext . " class='" . $classname . "'>";
}
