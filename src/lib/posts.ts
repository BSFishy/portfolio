import { dev } from '$app/environment';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

const POSTS = import.meta.glob('/posts/*.md', { eager: true, as: 'raw' });

type Post = {
  slug: string,
  title: string,
  tagline: string,
  date?: Date,
  draft: boolean,
  content: string,
};

export async function getPost(slug: string): Promise<Post> {
  const contents = POSTS[`/posts/${slug}.md`];
  const frontmatter = matter(contents);
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(frontmatter.content);

  const {
    title,
    tagline,
    date,
    draft,
  } = frontmatter.data as Partial<Record<string, string>>;

  return {
    slug,
    title: title!,
    tagline: tagline!,
    date: date ? new Date(date) : undefined,
    draft: !!draft,
    content: String(html),
  }
}

export async function getPosts() {
  const posts: Array<Post> = [];

  for (const filename in POSTS) {
    const post = await getPost(filename.slice('/posts/'.length, filename.length - '.md'.length));

    if (dev || !post.draft) {
      posts.push(post);
    }
  }

  // wrote this while i was inebriated, so if it looks funky, that's why
  posts.sort((a, b) => {
    const left = a.date;
    const right = b.date;

    if (!left) {
      if (!right) {
        return 0;
      }

      return 1;
    }

    if (!right) {
      return -1;
    }

    if (left > right) {
      return -1;
    }

    if (left < right) {
      return 1;
    }

    return 0;
  });

  return posts;
}
