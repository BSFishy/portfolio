<script>
	import '../app.css';

	import { page } from '$app/state';
</script>

<svelte:head>
	<link rel="canonical" href={'https://www.mattprovost.dev' + page.url.pathname} />
</svelte:head>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Shrikhand&display=swap');

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5) {
		font-family: 'Shrikhand', serif;
		font-weight: 400;
		font-style: normal;
	}

	:global(body) {
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-style: normal;
	}
</style>
