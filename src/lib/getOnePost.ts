import matter from "gray-matter";
import glob from "fast-glob";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";

// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { rehypePluginPreWrapper } from "./rehype-pre-wrapper";

// remark
import remarkGfm from "remark-gfm";
// import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import remarkTocHeadings from "./remark-toc-headings";
import { Toc } from "@/types/Toc";
const root = process.cwd();

export const getPost = async (slug: String[]) => {
  const pathAll = `post/${slug.join("/")}.mdx`;
  const fileContents = fs.readFileSync(path.join(pathAll), "utf8");
  const { data, content } = matter(fileContents);
  const tags = data.tags.split(",").map((e) => ({
    tag_name: e.trim(),
    tag_path: `${e.trim()}`,
  }));
  const toc: Toc = [];
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        // [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
        rehypePluginPreWrapper,
      ],
      format: "mdx",
    },
    parseFrontmatter: true,
  });
  return {
    ...data,
    content,
    tags,
    date: `${dayjs(data.date).format("YYYY MMM DD")}`,
    source: mdxSource,
    toc,
    user_name: data.user ?? "chendap",
  };
};
