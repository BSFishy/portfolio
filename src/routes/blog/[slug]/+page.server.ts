import type { PageServerLoad } from './$types';
import { getPost } from "$lib/posts";

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPost(params.slug);

  return {
    post,
  };
};
