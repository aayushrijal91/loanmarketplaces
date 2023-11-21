<footer class="bg-light">
	<div class="container">
		<div class="flex flex-wrap justify-center md:justify-between py-8 text-sm gap-y-6">
			<p class="w-fit">Terms & Conditions <span class="px-7">|</span> Privacy Policy</p>

			<p class="w-fit">© <?= $site ?> <?= date('Y') ?> | All Rights Reserved</p>

			<p class="w-fit">Powered by AiiMS Group</p>
		</div>
	</div>
</footer>

<a href="javascript:" id="return-to-top">
	<div class="d-flex justify-content-center align-items-center h-100 w-100">
		<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#ffffff" class="bi bi-arrow-up" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
		</svg>
	</div>
</a>
<script type="text/javascript" src="./assets/js/app.js?v=0.3"></script>

<?php if ($application_page) : ?>
	<script async src="https://tag.clearbitscripts.com/v1/pk_ddb38ae22b25239f16051287139d4d08/tags.js" referrerpolicy="strict-origin-when-cross-origin"></script>
<?php endif; ?>

</body>

</html>