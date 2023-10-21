<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	export let align = 'center';

	export let justify = 'center';

	export let restrictWidth = false;

	export let fullWidth = false;

	export let hasHeader = true;
</script>

{#if hasHeader}
	<Header />
{/if}

<main
	class:align-center={align === 'center'}
	class:align-start={align === 'start'}
	class:restrict-width={restrictWidth}
	class:max-width={fullWidth}
	class:justify-center={justify === 'center'}
	class:justify-start={justify === 'start'}
>
	<slot />
</main>

<Footer />

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	main {
		display: flex;
		flex-direction: column;
		flex: auto;
	}

	.restrict-width {
		margin: 0 calc(var(--size) * 2);
		max-width: var(--max-width);
	}

	.max-width {
		width: 100%;
	}

	.align-center {
		align-items: center;
	}

	.align-start {
		align-items: flex-start;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-start {
		justify-content: flex-start;
	}
</style>
