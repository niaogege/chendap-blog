import { getAllPosts } from "./getAllPost";
import kebabCase from "@/utils/kebabCase";

export const getAllTags = async () => {
  const posts = await getAllPosts({});
  const tagCount: Record<string, number> = {};
  if (posts && posts.length) {
    posts.forEach((post) => {
      post.tag.forEach((tag: string) => {
        const formattedTag = kebabCase(tag.trim());
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    });
  }
  return tagCount;
};
