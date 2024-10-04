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

	<section>
		{#each posts as post}
			<a href={`/blog/${post.slug}`}>
				<article>
					<h2>{post.title}</h2>
					<summary>{post.tagline}</summary>
					<span>{post.date?.toLocaleDateString()}</span>
				</article>
			</a>
		{:else}
			<p>No content just yet. Stay tuned!</p>
		{/each}
	</section>
</Centered>

<style>
	section {
		width: 100%;
	}

	section > *:not(:first-child) > * {
		border-top: var(--border-size) solid var(--primary-color);
	}

	section > * > * {
		--border-size: calc(var(--size) * 0.2);
		--margin-size: calc(var(--size) * 3);

		padding: var(--margin-size) 0 var(--margin-size);
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	h2 {
		margin: 0 0 var(--size);
	}

	span {
		font-size: calc(var(--size) * 0.8);
	}
</style>
