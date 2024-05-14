import type { PageServerLoad, EntryGenerator } from './$types';
import { getPost, getPosts } from '$lib/posts';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);

	return {
		post
	};
};

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();

	return posts.map((post) => ({
		slug: post.slug
	}));
};

export const prerender = true;

export const csr = dev;
