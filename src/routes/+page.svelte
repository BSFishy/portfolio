<script>
	import Centered from '$lib/Centered.svelte';
	import Github from '$lib/icons/Github.svelte';
	import LinkedIn from '$lib/icons/LinkedIn.svelte';
	import Blog from '$lib/icons/Blog.svelte';
	import Experience from '$lib/Experience.svelte';
</script>

<svelte:head>
	<title>Matt Provost</title>
	<meta name="description" content="My portfolio and blog" />
</svelte:head>

<Centered hasHeader={false} restrictWidth={true} fullWidth={true}>
	<h1>Matt Provost</h1>
	<div class="items">
		<a href="https://github.com/BSFishy" target="_blank"> <Github size={1.5} /></a>
		<a href="https://www.linkedin.com/in/matt-provost/" target="_blank"><LinkedIn size={1.5} /></a>
		<a href="/blog/"><Blog size={1.5} /></a>
	</div>
	<div class="items">
		<a href="/about/">About me</a>
		<a href="/blog/">Blog</a>
	</div>
</Centered>

<style>
	h1 {
		margin: 0;
		font-size: calc(var(--size) * 3);
	}

	.items {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.items > a {
		margin: var(--size);
		font-size: calc(var(--size) * 1.25);
	}
</style>
