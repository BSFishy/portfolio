<script lang="ts">
  import type { PageData } from './$types';
  import Centered from "$lib/Centered.svelte";

  export let data: PageData;

  let post = data.post;
</script>

<svelte:head>
  <title>{post.title} | Matt Provost</title>
  <meta name="description" content={post.tagline} />
</svelte:head>

<Centered restrictWidth="true" fullWidth="true" align="start" justify="start">
  <a href="/blog">Back to blog</a>

  <h1>{post.title}</h1>

  <span>{post.date?.toLocaleDateString()}</span>

  <summary>{post.tagline}</summary>

  {@html post.content}
</Centered>

<style>
    a {
        margin-top: var(--size);
    }

    h1 {
        margin: var(--size) 0 0;
    }

    span {
        font-size: calc(var(--size) * 0.8);
        color: var(--secondary-color);
        margin-bottom: calc(var(--size) * 1.5);
    }

    summary {
        margin-bottom: calc(var(--size) * 2);
    }
</style>
