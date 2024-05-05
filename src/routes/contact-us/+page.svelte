<script>
	import fb_logo from './Facebook_Logo_Primary.png';
	import ig_logo from './Instagram_Glyph_Gradient.png';
</script>

<h1>Contact Us</h1>

<p>
	Email Address: <a href="mailto:kendoinfo@umich.edu"> kendoinfo@umich.edu</a>
</p>

<h2>Find us on:</h2>

<figure>
	<a href="https://www.facebook.com/groups/1038072369705184">
		<img class="social-media" src={fb_logo} alt="Facebook logo" />
	</a>
	<a href="https://www.instagram.com/kendoumich/">
		<img class="social-media" src={ig_logo} alt="Instagram logo" />
	</a>
</figure>

<style>
	.social-media {
		padding: 1em;
		width: 100px;
		height: auto;
	}

	.social-media:hover {
		opacity: 0.7;
	}
</style>
