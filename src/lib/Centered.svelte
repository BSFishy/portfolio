<script>
	export let align = 'center';

	export let justify = 'center';

	export let restrictWidth = false;

	export let fullWidth = false;
</script>

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

<style>
	:global(body) {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main {
		display: flex;
		flex-direction: column;
	}

	.restrict-width {
		max-width: 50%;
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
		min-height: 100vh;
	}
</style>
