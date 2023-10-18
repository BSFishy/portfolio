<script>
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import 'sanitize.css';
	import 'sanitize.css/typography.css';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
