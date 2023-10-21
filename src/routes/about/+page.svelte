<script>
	import Centered from '$lib/Centered.svelte';
</script>

<Centered align="start" restrictWidth={true}>
	<h1>Hello</h1>

	<p>
		My name is Matt. I'm a software developer currently based out of Seattle, Washington. I have a
		huge number of hobbies and miscellaneous things I enjoy doing. If you really look, you'll
		probably be able to find some of my thoughts about them <a href="/blog">over here</a>.
	</p>

	<p>
		I currently work at AWS on the <a href="https://github.com/opensearch-project"
			>OpenSearch Project</a
		>. My work is mostly on
		<a href="https://github.com/opensearch-project/OpenSearch-Dashboards">OpenSearch Dashboards</a>
		and <a href="https://github.com/opensearch-project/oui">OUI</a>.
	</p>
</Centered>

<style>
	p {
		font-size: calc(var(--size) * 1.2);
	}
</style>
