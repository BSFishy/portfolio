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
	class={{
		flex: true,
		'flex-col': true,
		'flex-auto': true,
		'items-center': align === 'center',
		'items-start': align === 'start',
		'mx-2': restrictWidth,
		'max-w-(--max-width)': restrictWidth,
		'w-full': fullWidth,
		'justify-center': justify === 'center',
		'justify-start': justify === 'start'
	}}
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
</style>
