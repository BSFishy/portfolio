import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/posts';
import { dev } from '$app/environment';

export const load: PageServerLoad = async () => {
	const posts = await getPosts();

	return {
		posts
	};
};

export const prerender = true;

export const csr = dev;
