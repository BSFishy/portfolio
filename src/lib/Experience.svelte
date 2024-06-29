<script lang="ts">
	export let company: string;

	export let title: string;

	export let items: Array<string>;

	export let from: string | undefined = undefined;

	export let to: string | undefined = undefined;

	export let location: string | undefined = undefined;
</script>

<div class="container">
	<h3><b>{company}</b> - {title}</h3>
	{#if location}
		<span class="location">{location}</span>
		<br />
	{/if}

	{#if from}
		{from} -
		{#if to}
			{to}
		{:else}
			Present
		{/if}
		<br />
	{/if}

	<ul>
		{#each items as item}
			<li>{item}</li>
		{/each}
	</ul>
</div>

<style>
	.container {
		width: 100%;
	}

	h3 {
		margin: 0;
		font-size: calc(var(--size) * 1.5);
	}

	.location {
		font-size: calc(var(--size) * 1.2);
	}
</style>
