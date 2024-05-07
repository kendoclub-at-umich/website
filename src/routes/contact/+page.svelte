<script>
	import fbLogo from './Facebook_Logo_Primary.png';
	import igLogo from './Instagram_Glyph_Gradient.png';
</script>

<h1>Contact Us</h1>

<p>
	Email Address: <a href="mailto:kendoinfo@umich.edu"> kendoinfo@umich.edu</a>
</p>

<h2>Find us on:</h2>

<a href="https://www.facebook.com/groups/1038072369705184">
	<img class="social-media" src={fbLogo} alt="Facebook" />
</a>
<a href="https://www.instagram.com/kendoumich/">
	<img class="social-media" src={igLogo} alt="Instagram" />
</a>

<style>
	.social-media {
		--icon-width: 75px;
		min-width: 29px;

		box-sizing: content-box;
		width: var(--icon-width);
		height: auto;
		padding: calc(var(--icon-width) / 4);
	}

	.social-media:hover {
		opacity: 0.7;
	}
</style>
