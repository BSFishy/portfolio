<script>
	import Centered from '$lib/Centered.svelte';
	import Github from '$lib/icons/Github.svelte';
	import LinkedIn from '$lib/icons/LinkedIn.svelte';
	import Blog from '$lib/icons/Blog.svelte';
	import AWS from '$lib/icons/AWS.svelte';
	import Cloudflare from '$lib/icons/Cloudflare.svelte';
	import Office from '$lib/icons/Office.svelte';
</script>

<svelte:head>
	<title>Matt Provost</title>
	<meta name="description" content="My portfolio and blog" />
</svelte:head>

<Centered hasHeader={false} restrictWidth={true} fullWidth={true}>
	<div class="container">
		<div class="left">
			<enhanced:img src="./headshot.jpg" alt="Headshot" class="headshot" width="250" height="250" />
			<h1>Matt Provost</h1>
			<p>
				Experienced software engineer with a diverse background in front-end, back-end, full-stack,
				game, systems, and embedded development.
			</p>
			<div class="items">
				<a href="https://github.com/BSFishy" target="_blank" title="Github">
					<Github size={1.5} />
				</a>
				<a href="https://www.linkedin.com/in/matt-provost/" target="_blank" title="LinkedIn">
					<LinkedIn size={1.5} />
				</a>
				<a href="/blog" title="Blog"><Blog size={1.5} /></a>
			</div>
		</div>
		<div class="right">
			<h2>Systems Engineer</h2>
			<p>
				Currently making moves at
				<a href="https://www.cloudflare.com/" target="_blank">Cloudflare</a>
				working on the
				<a href="https://www.cloudflare.com/zero-trust/products/access/" target="_blank">
					Access team
				</a>
			</p>
			<a href="/blog" title="Blog" class="button">What am I thinking</a>
			<hr />
			<h3>Experience</h3>
			<div class="exp">
				<div class="exp-icon">
					<Cloudflare size={2} />
				</div>
				<div class="exp-data">
					<div class="exp-info">
						<h4>Cloudflare</h4>
						<p>Systems Engineer</p>
					</div>
					<div class="exp-time">
						<span>Present</span>
						<span>July 2024</span>
					</div>
				</div>
			</div>
			<div class="exp">
				<div class="exp-icon">
					<AWS size={2} />
				</div>
				<div class="exp-data">
					<div class="exp-info">
						<h4>Amazon Web Services</h4>
						<p>Web Development Engineer</p>
					</div>
					<div class="exp-time">
						<span>April 2024</span>
						<span>August 2022</span>
					</div>
				</div>
			</div>
			<div class="exp">
				<div class="exp-icon">
					<Office size={2} />
				</div>
				<div class="exp-data">
					<div class="exp-info">
						<h4>TrainBeyond</h4>
						<p>Software Engineer</p>
					</div>
					<div class="exp-time">
						<span>July 2022</span>
						<span>May 2022</span>
					</div>
				</div>
			</div>
			<div class="exp">
				<div class="exp-icon">
					<Office size={2} />
				</div>
				<div class="exp-data">
					<div class="exp-info">
						<h4>WebCreek</h4>
						<p>Software Engineer</p>
					</div>
					<div class="exp-time">
						<span>May 2022</span>
						<span>March 2019</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</Centered>

<style>
	h1 {
		margin-bottom: 0;
		font-size: calc(var(--size) * 3);
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.container > * {
		padding: 0 var(--size);
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 50%;
		min-width: 375px;
		margin-top: calc(var(--size) * 4);
	}

	.right {
		max-width: 50%;
		min-width: 375px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.right > * {
		text-align: center;
	}

	.headshot {
		border-radius: 10%;
	}

	p {
		text-align: center;
	}

	.items {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.items > a {
		margin: var(--size);
		font-size: calc(var(--size) * 1.25);
	}

	h2 {
		font-size: calc(var(--size) * 2);
		margin-bottom: 0;
	}

	.button {
		padding: var(--size);
		text-decoration: none;
		background: var(--primary-color);
		background: linear-gradient(133deg, var(--primary-color) 0%, var(--secondary-color) 100%);
		border-radius: calc(var(--size) * 2);
		filter: hue-rotate(0deg);
		transition: all 800ms ease-in-out;
	}

	.button:hover {
		filter: hue-rotate(180deg);
		transform: scale(1.05);
	}

	hr {
		width: 25%;
		border-color: var(--text-color);
		margin: calc(var(--size) * 2) 0;
	}

	h3 {
		font-size: calc(var(--size) * 1.7);
		margin: 0;
	}

	h4 {
		font-size: calc(var(--size) * 1.2);
		margin: 0;
	}

	.exp {
		display: flex;
		flex-direction: row;
		border: 2px solid var(--text-color);
		border-radius: calc(var(--size) * 3);
		padding: var(--size);
		width: 100%;
		margin-top: var(--size);
	}

	.exp p {
		margin: 0;
	}

	.exp-icon {
		background-color: var(--text-color);
		border-radius: calc(var(--size) * 2);
		height: min-content;
		padding: calc(var(--size) * 0.5);
	}

	.exp-data {
		flex: 1 1 0;
		margin: 0 var(--size);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--size);
		align-items: center;
	}

	.exp-info > * {
		text-align: left;
	}

	.exp-time {
		display: flex;
		flex-direction: column;
	}
</style>
