import { json } from '@sveltejs/kit';

function choices<T>(options: T[]): T {
	return options[Math.floor(Math.random() * options.length)];
}

export function GET() {
	return json(choices(['apple', 'balls', 'stake', 'skate', 'acorn']));
}
