<script lang="ts">
	export let company: string;

	export let title: string;
</script>

<div class="flex flex-row border-2 rounded-8xl p-1 w-full mt-1">
	<div class="bg-text-200 rounded-6xl p-0.5 h-min">
		<slot />
	</div>
	<div class="exp-data mx-1 flex flex-col justify-center">
		<h4 class="text-2xl">{company}</h4>
		<p>{title}</p>
	</div>
</div>
