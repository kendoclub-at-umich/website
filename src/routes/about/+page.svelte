<script lang="ts">
	import MetaTags from '$lib/MetaTags.svelte';
</script>

<svelte:head>
	<MetaTags
		title="About Us"
		description="Kendo Club at Umich is an official Voluntary Student Organization, practicing since 2001. Read about the club's history and motto."
	/>
</svelte:head>

<h1>About Us</h1>

<h2>History</h2>
<p>
	Kendo Club at the University of Michigan was founded in the fall of 2001 and officially recognized
	by the Midwest Kendo Federation (MWKF) in the fall of 2002. Instruction of our club was originally
	lead by Chika and Takashi Ezaki. Once they returned to Japan in 2003, instruction transitioned to
	Yukio Watanabe and Joe Ponchart. After the groundwork was laid out for a consistent practice space
	at the University of Michigan, cross training with
	<a href="https://www.seishinkankendo.com/">Seishinkan Kendo</a> in Ypsilanti (formerly Eastern Kendo
	Club) continued. Our shared history reaffirms our continued partnership as both clubs seek to advance
	and promote the practice of Kendo in the Midwest. Many of our instructors and members continue to train
	at both locations.
</p>
<p>
	Our club is classified as a student organization through the Michigan Student Assembly, the
	student government of the University of Michigan. Our Kendo Club is also part of the
	<a href="https://www.midwestkendofederation.org/">Midwest Kendo Federation (MWKF)</a>, which is
	the regional chapter under the
	<a href="https://www.auskf.org/">All United States Kendo Federation (AUSKF)</a>, the national
	governing body for Kendo. The MWKF is responsible for all Kendo clubs and Dojos in the Midwest
	area.
</p>

<figure>
	<enhanced:img
		src="./group-photo-2011.jpg"
		sizes="min(798px, 100vw)"
		alt="24 club members posing in bogu or regular clothing, smiling."
	/>
	<figcaption>Group photo of the club members in 2011!</figcaption>
</figure>

<h2>Motto</h2>

<p class="motto">心技一体</p>

<p>
	Our club motto reads "Shin Gi Ittai", which translates approximately to "The Spirit and Skill are
	One Body" or "The Heart and Technique are Together". This motto was one of several proposed by
	Masaki Hori in the fall of 2004, and was chosen by our club officers and coaches to best represent
	the ideals we strive for in our club. This motto is on our club tenugui (cloth headband worn under
	the helmet), which is traditionally given to club members before their first competition as a sign
	of mutual support and encouragement.
</p>

<figure>
	<enhanced:img
		src="./putting-on-bogu.jpg"
		sizes="min(798px, 100vw)"
		alt="A club member sitting with most of their armor on, putting on the helmet."
	/>
	<figcaption>
		Club member putting on the part of his bogu that will protect his head, the men.
	</figcaption>
</figure>

<h2>Constitution</h2>
<p>
	We are officially recognized as a
	<a href="https://campusinvolvement.umich.edu/content/voluntary-student-organizations">
		Voluntary Student Organization
	</a>
	by the University of Michigan. Our club constitution can be found on
	<a href="https://maizepages.umich.edu/organization/kendoclub">Maize pages</a>.
</p>

<style>
	.motto {
		font-size: 2.5em;
	}
</style>
