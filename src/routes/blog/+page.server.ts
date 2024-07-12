import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
	const posts = await getPosts();

	return {
		posts
	};
};

// NOTE: this is required on Cloudflare, for whatever reason (something about dynamic imports)
export const prerender = true;
