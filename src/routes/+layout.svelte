<script>
	import 'sanitize.css';
	import 'sanitize.css/typography.css';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href={'https://www.mattprovost.dev' + $page.url.pathname} />
</svelte:head>

<slot />
