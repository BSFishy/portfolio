import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/posts';

export const load: PageServerLoad = async () => {
	const posts = await getPosts();

	return {
		posts
	};
};

export const prerender = true;
