<script lang="ts">
	import type { PageData } from './$types';
	import Centered from '$lib/Centered.svelte';

	export let data: PageData;

	let posts = data.posts;
</script>

<svelte:head>
	<title>Blog | Matt Provost</title>
	<meta name="description" content="Blog posts" />
</svelte:head>

<Centered restrictWidth={true} fullWidth={true} align="start" justify="start">
	<h1>Blog</h1>

	<p>Welcome to my blog! Here is where I spew some of my thoughts and things.</p>

	<section class="w-full">
		{#each posts as post}
			<a class="hover:underline" href={`/blog/${post.slug}`}>
				<article class="py-3">
					<h2 class="mb-1">{post.title}</h2>
					<summary class="block">{post.tagline}</summary>
					<span class="text-sm">{post.date?.toLocaleDateString()}</span>
				</article>
			</a>
		{:else}
			<p>No content just yet. Stay tuned!</p>
		{/each}
	</section>
</Centered>

<style>
	section > *:not(:first-child) > * {
		border-top: var(--border-size) solid var(--primary-color);
	}
</style>
