<script>
	import Centered from '$lib/Centered.svelte';
</script>

<Centered hasHeader={false}>
	<h1>Matt Provost</h1>
	<div>
		<a href="/blog">Blog</a>
		<a href="/about">About me</a>
	</div>
</Centered>

<style>
	h1 {
		margin: 0;
		font-size: calc(var(--size) * 3);
	}

	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	a {
		margin: var(--size);
	}
</style>
