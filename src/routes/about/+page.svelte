<script>
	import Centered from '$lib/Centered.svelte';
	import Experience from '$lib/Experience.svelte';
</script>

<svelte:head>
	<title>Matt Provost</title>
	<meta name="description" content="My portfolio and blog" />
</svelte:head>

<Centered hasHeader={false} restrictWidth={true} fullWidth={true}>
	<h1><a href="/">Matt Provost</a></h1>
	<div>
		<p>
			Hi, I'm Matt. I'm a Systems Engineer at <a href="https://www.cloudflare.com/">Cloudflare</a>
			working on the
			<a href="https://www.cloudflare.com/zero-trust/products/access/">Access Team</a>. Previously,
			I've worked on <a href="https://opensearch.org/">the OpenSearch Project</a> at
			<a href="https://aws.amazon.com/">Amazon Web Services</a>.
		</p>
		<p>
			I'm interested in all things tech. I started programming at the age of 10, and have been
			fueled by passion and curiousity ever since. Exploring anything that has interested me, I've
			delved into full-stack, mobile, embedded, games, and systems development. Landing my first job
			as a software engineer at the age of 16 introduced me to the industry, and I've been learning
			and honing my skills ever since.
		</p>
		<p>
			Overall, I'm a very curious and innovative person. My goal is to have a substantial and
			lasting impact on all of humanity through the design and development of software. I'm
			constantly learning through exploring new projects and contributing to open source.
		</p>
	</div>

	<h2>Experience</h2>
	<div class="full">
		<Experience
			company="AWS"
			title="Web Development Engineer"
			from="August 2022"
			to="April 2024"
			location="Bellevue, WA"
			items={[
				"Spearheaded enhancements to OpenSearch's design system (OUI), streamlining CI/CD processes and fortifying the build system.",
				'Pioneered a dynamic content framework for the homepage, demonstrating technical proficiency and innovative thinking.',
				'Mentored college students in the OpenSearch Contributor Initiative (OSCI), fostering a collaborative learning environment.'
			]}
		/>
		<Experience
			company="TrainBeyond"
			title="Software Engineer"
			from="May 2022"
			to="July 2022"
			location="The Woodlands, TX"
			items={[
				'Engineered dynamically loaded content functionality, enabling seamless downloading and local execution of remote code.',
				'Implemented a Lua runtime for dynamic scripting of NPC features, enhancing interactivity within the training platform.'
			]}
		/>
		<Experience
			company="WebCreek"
			title="Software Engineer"
			from="March 2019"
			to="May 2022"
			location="The Woodlands, TX"
			items={[
				'Revitalized the iOS app "Voyager," overhauling core libraries and functionalities in Swift for improved ergonomics.',
				"Optimized TrainBeyond's interactive training software for iOS devices, ensuring smooth performance on resource-constrained devices."
			]}
		/>
	</div>
</Centered>

<style>
	h1 {
		margin: 0;
		font-size: calc(var(--size) * 3);
	}

	h2 {
		margin: 0;
		font-size: calc(var(--size) * 2);
	}

	.full {
		width: 100%;
	}
</style>
