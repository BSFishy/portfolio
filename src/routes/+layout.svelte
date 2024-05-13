<script>
	import { dev, browser } from '$app/environment';
	import { page } from '$app/stores';
  import { injectSpeedInsights } from '@vercel/speed-insights';

	import 'sanitize.css';
	import 'sanitize.css/typography.css';

  injectSpeedInsights();
</script>

<slot />
