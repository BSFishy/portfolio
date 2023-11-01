<script>
	import { dev, browser } from '$app/environment';
	import { webVitals } from '$lib/vitals';
	import { inject } from '@vercel/analytics';
	import { page } from '$app/stores';

	import 'sanitize.css';
	import 'sanitize.css/typography.css';

	inject({ mode: dev ? 'development' : 'production' });

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId,
			debug: dev
		});
	}
</script>

<slot />
