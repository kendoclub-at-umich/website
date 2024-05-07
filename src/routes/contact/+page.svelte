<script>
	import fbLogo from './facebook-logo-primary.png';
	import igLogo from './instagram-glyph-gradient.png';
</script>

<h1>Contact Us</h1>

<p>
	Email Address: <a href="mailto:kendoinfo@umich.edu"> kendoinfo@umich.edu</a>
</p>

<h2>Find us on:</h2>

<a href="https://www.facebook.com/groups/1038072369705184">
	<img class="social-media" src={fbLogo} alt="Facebook" /> KendoClub@Michigan
</a>
<a href="https://www.instagram.com/kendoumich/">
	<img class="social-media" src={igLogo} alt="Instagram" /> @kendoumich
</a>

<style>
	.social-media {
		--icon-width: 75px;

		box-sizing: content-box;
		width: var(--icon-width);
		height: auto;
		padding: calc(var(--icon-width) / 4);
	}
</style>
