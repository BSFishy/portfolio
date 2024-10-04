<script lang="ts">
	import type { PageData } from './$types';
	import Centered from '$lib/Centered.svelte';

	export let data: PageData;

	let post = data.post;
</script>

<svelte:head>
	<title>{post.title} | Matt Provost</title>
	<meta name="description" content={post.tagline} />
</svelte:head>

<Centered restrictWidth={true} fullWidth={true} align="start" justify="start" hasHeader={false}>
	<a href="/blog">Back to blog</a>

	<h1>{post.title}</h1>

	<span>{post.date?.toLocaleDateString()}</span>

	<summary>{post.tagline}</summary>

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html post.content}
</Centered>

<style>
	a {
		margin-top: var(--size);
	}

	h1 {
		font-size: calc(var(--size) * 3.5);
		margin: var(--size) 0 0;
	}

	span {
		font-size: calc(var(--size) * 0.8);
		margin-bottom: calc(var(--size) * 1.5);
	}

	summary {
		margin-bottom: calc(var(--size) * 2);
		font-size: calc(var(--size) * 1.2);
	}

	:global(hr) {
		width: 25%;
		color: var(--text-color);
	}

	:global(blockquote) {
		border-left: calc(var(--size) * 0.3) solid var(--primary-color);
		margin: var(--size);
		padding: 0 var(--size);
	}

	:global(:not(pre) > code) {
		padding: calc(var(--size) * 0.2);
		border-radius: calc(var(--size) * 0.2);
		background-color: var(--text-color);
		color: var(--background-color);
	}

	:global(pre) {
		width: 100%;
		border-radius: calc(var(--size) * 0.5);
		padding: calc(var(--size) * 0.5);
		background-color: var(--text-color);
		color: var(--background-color);
	}

	:global(p) {
		text-align: justify;
		line-height: 1.8;
	}
</style>
