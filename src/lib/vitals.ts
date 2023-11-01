import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

interface Options {
	params: Record<string, string>;
	path: string;
	analyticsId: string;
	debug: boolean;
}

function getConnectionSpeed(): string {
	if ('connection' in navigator && navigator.connection) {
		const connection = navigator.connection as object;
		if ('effectiveType' in connection && connection.effectiveType) {
			return connection.effectiveType as string;
		}
	}

	return '';
}

function sendToAnalytics(metric: Metric, options: Options) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed()
	};

	if (options.debug) {
		console.log('[Web Vitals]', metric.name, JSON.stringify(body, null, 2));
	}

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`
		type: 'application/x-www-form-urlencoded'
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true
		}).catch(console.error);
}

export function webVitals(options: Options) {
	try {
		onFID((metric) => sendToAnalytics(metric, options));
		onTTFB((metric) => sendToAnalytics(metric, options));
		onLCP((metric) => sendToAnalytics(metric, options));
		onCLS((metric) => sendToAnalytics(metric, options));
		onFCP((metric) => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Web Vitals]', err);
	}
}
