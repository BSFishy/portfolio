import type { PageServerLoad, EntryGenerator } from './$types';
import { getPost, getPosts } from '$lib/server/posts';

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

// NOTE: this is required on Cloudflare, for whatever reason (something about dynamic imports)
export const prerender = true;
