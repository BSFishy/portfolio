<script>
	import Centered from '$lib/Centered.svelte';
	import Github from '$lib/icons/Github.svelte';
	import LinkedIn from '$lib/icons/LinkedIn.svelte';
	import Blog from '$lib/icons/Blog.svelte';
	import AWS from '$lib/icons/AWS.svelte';
	import Cloudflare from '$lib/icons/Cloudflare.svelte';
	import Office from '$lib/icons/Office.svelte';
	import Experience from '$lib/Experience.svelte';
</script>

<svelte:head>
	<title>Matt Provost</title>
	<meta name="description" content="My portfolio and blog" />
</svelte:head>

<Centered hasHeader={false} restrictWidth={true} fullWidth={true}>
	<div
		class="flex flex-row justify-center items-start
    flex-wrap"
	>
		<div
			class="px-1 flex flex-col justify-center items-center
      max-w-1/2 min-w-[375px] mt-4"
		>
			<enhanced:img
				src="./headshot.jpg"
				alt="Headshot"
				class="headshot rounded-3xl"
				width="250"
				height="250"
			/>
			<h1 class="my-2 text-5xl">Matt Provost</h1>
			<p class="text-center">
				Experienced software engineer with a diverse background in front-end, back-end, full-stack,
				game, systems, and embedded development.
			</p>
			<div class="flex flex-row items-center justify-center">
				<a class="m-0.75 text-2xl" href="https://github.com/BSFishy" target="_blank" title="Github">
					<Github size={1.5} />
				</a>
				<a
					class="m-0.75 text-2xl"
					href="https://www.linkedin.com/in/matt-provost/"
					target="_blank"
					title="LinkedIn"
				>
					<LinkedIn size={1.5} />
				</a>
				<a class="m-0.75 text-2xl" href="/blog" title="Blog"><Blog size={1.5} /></a>
			</div>
		</div>
		<div
			class="px-1 max-w-1/2 min-w-[375px] flex flex-col
      justify-center items-center"
		>
			<h2 class="text-3xl mb-0">Systems Engineer</h2>
			<p class="text-center my-1">
				Currently making moves at
				<a class="underline" href="https://www.cloudflare.com/" target="_blank">Cloudflare</a>
				working on the
				<a
					class="underline"
					href="https://www.cloudflare.com/zero-trust/products/access/"
					target="_blank"
				>
					Access team
				</a>
			</p>
			<hr class="w-1/4 border-text-200 my-1.5" />
			<h3 class="text-2xl m-0">Experience</h3>
			<Experience company="Cloudflare" title="Systems Engineer">
				<Cloudflare size={2} />
			</Experience>
			<Experience company="AWS" title="Web Development Engineer">
				<AWS size={2} />
			</Experience>
			<Experience company="TrainBeyond" title="Software Engineer">
				<Office size={2} />
			</Experience>
			<Experience company="WebCreek" title="Softward Engineer">
				<Office size={2} />
			</Experience>
		</div>
	</div>
</Centered>
