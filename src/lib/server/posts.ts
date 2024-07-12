import { dev } from '$app/environment';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

const POSTS = import.meta.glob('../../../posts/*.md', { query: '?raw', import: 'default' });

type Post = {
	slug: string;
	title: string;
	tagline: string;
	date?: Date;
	draft: boolean;
	content: string;
};

export async function getPost(slug: string): Promise<Post> {
	const contents = (await POSTS[`../../../posts/${slug}.md`]()) as string;
	// const contents = POSTS[0];
	const frontmatter = matter(contents);
	const html = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkEmoji)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'append' })
		.use(rehypeStringify)
		.process(frontmatter.content);

	const { title, tagline, date, draft } = frontmatter.data as Partial<Record<string, string>>;

	return {
		slug,
		title: title!,
		tagline: tagline!,
		date: date ? new Date(date) : undefined,
		draft: !!draft,
		content: String(html)
	};
}

export async function getPosts() {
	const postPromises: Array<Promise<Post>> = [];

	console.log(POSTS);
	for (const filename in POSTS) {
		postPromises.push(
			getPost(filename.slice('../../../posts/'.length, filename.length - '.md'.length))
		);
	}

	const posts = (await Promise.all(postPromises)).filter((post) => dev || !post.draft);

	posts.sort((a, b) => {
		const left = a.date ?? new Date(0);
		const right = b.date ?? new Date(0);

		if (left > right) {
			return -1;
		}

		if (left < right) {
			return 1;
		}

		const leftTitle = a.title ?? '';
		const rightTitle = b.title ?? '';

		return leftTitle.localeCompare(rightTitle);
	});

	return posts;
}
