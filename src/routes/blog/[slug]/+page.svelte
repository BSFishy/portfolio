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
	<a class="mt-1 underline" href="/blog">Back to blog</a>

	<h1 class="text-4xl mt-1">{post.title}</h1>

	<span class="text-sm mb-1.5">{post.date?.toLocaleDateString()}</span>

	<summary class="block mb-2 text-xl">{post.tagline}</summary>

	<div class="blog-contents" style="display: contents">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html post.content}
	</div>
</Centered>

<style>
	div :global {
		hr {
			width: 25%;
			margin: var(--spacing) auto;
			border-color: var(--color-text-200);
		}

		blockquote {
			border-left: calc(var(--spacing) * 0.3) solid var(--color-primary-500);
			margin: var(--spacing);
			padding: 0 var(--spacing);
		}

		:not(pre) > code {
			padding: calc(var(--spacing) * 0.2);
			border-radius: calc(var(--spacing) * 0.2);
			background-color: var(--color-text-200);
			color: var(--color-background-900);
		}

		pre {
			width: 100%;
			border-radius: calc(var(--spacing) * 0.5);
			padding: calc(var(--spacing) * 0.5);
			overflow: auto;
		}

		h2 {
			font-size: var(--text-3xl);
		}

		a {
			text-decoration: underline;
		}

		ol {
			padding: revert;
			list-style: decimal;
		}

		ul {
			padding: revert;
			list-style: disc;
		}

		p {
			text-align: justify;
			line-height: 1.8;
			margin: var(--spacing) 0;
		}
	}
</style>
