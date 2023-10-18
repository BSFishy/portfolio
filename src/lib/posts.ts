import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

const DIRNAME = dirname(fileURLToPath(import.meta.url));
const ROOT_DIRECTORY = resolve(DIRNAME, '..', '..');
const POSTS_DIRECTORY = join(ROOT_DIRECTORY, 'posts');

type Post = {
  slug: string,
  title: string,
  tagline: string,
  date?: Date,
  content: string,
};

export async function getPost(slug: string): Promise<Post> {
  const contents = await readFile(join(POSTS_DIRECTORY, `${slug}.md`), { encoding: 'utf-8' });
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
  } = frontmatter.data as Partial<Record<string, string>>;

  return {
    slug,
    title: title!,
    tagline: tagline!,
    date: date ? new Date(date) : undefined,
    content: String(html),
  }
}

export async function getPosts() {
  const posts: Array<Post> = [];

  for (const file of await readdir(POSTS_DIRECTORY, { withFileTypes: true })) {
    if (!file.isFile()) {
      continue;
    }

    const filename = file.name;
    if (!filename.endsWith('.md')) {
      continue;
    }

    posts.push(await getPost(filename.slice(0, filename.length - '.md'.length)));
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
