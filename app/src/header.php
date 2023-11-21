<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="icon" href="./assets/images/favicon.png" type="image/png">
	<title><?= $site ?></title>
	<script>
		var SITE_URL = "<?= $SITE_URL ?>";
	</script>

	<?php if ($application_page) : ?>
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://s3.ap-southeast-2.amazonaws.com/widget.driveiq/assets/css/all.css">
		<link rel="stylesheet" href="https://s3.ap-southeast-2.amazonaws.com/widget.driveiq/widgetApplication/css/2.f858cb61.chunk.css">
		<link rel="stylesheet" href="https://s3.ap-southeast-2.amazonaws.com/widget.driveiq/widgetApplication/css/main.aa521ec1.chunk.css">

		<style>
			.match-bar-container .progress-bar {
				background-color: #9381FF;
			}

			.btn-standard.violet,
			.btn-standard.violet:hover {
				background-color: #9381FF;
				border-color: #9381FF;
			}
		</style>
	<?php endif; ?>

	<link rel="stylesheet" href="./assets/css/main.css?v=0.1">

	<!-- Recaptcha Here -->
	<!-- <script src="https://www.google.com/recaptcha/api.js?render=<?= $recaptcha_client_secret ?>"></script>
	<script>
		grecaptcha.ready(function() {
			grecaptcha.execute('<?= $recaptcha_client_secret ?>', {
				action: 'contact'
			}).then(function(token) {
				document.getElementById('recaptchaResponse').value = token;
			});
		});
	</script> -->
</head>

<body>