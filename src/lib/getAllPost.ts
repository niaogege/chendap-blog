import matter from "gray-matter";
import glob from "fast-glob";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import { kebabCase, getTextSummary } from "@/utils";

// 简介字数限制
const wordCount = 50;
const root = process.cwd();

export const postsPath = path.join(root, "post");
// 得到根目录下的post文件夹下的所有内容
export const getAllPosts = async ({ cfg }: any) => {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || postsPath;
  const files = glob.sync(`${srcDir}/**/*.mdx`, { ignore: ["node_modules"] });
  const data = files
    .map((v) => {
      if (!v) return null;
      let route = v.replace(".mdx", "");
      if (route.startsWith("./")) {
        route = route.replace(
          new RegExp(`^\\.\\/${path.join(srcDir, "/")}`),
          ""
        );
      } else {
        route = route.replace(new RegExp(`^${path.join(srcDir, "/")}`), "");
      }
      const fileContent = fs.readFileSync(v, "utf-8");
      const { data: meta, content } = matter(fileContent);
      const tags =
        (meta.tags &&
          meta.tags.split(",").map((e) => ({
            tag_name: e.trim(),
            tag_path: `${kebabCase(e.trim())}`,
          }))) ||
        [];

      const brief = getTextSummary(fileContent, wordCount);
      return {
        ...meta,
        tags,
        tag: (meta.tags && meta.tags.split(",")) || [],
        date: dayjs(meta.date).isValid()
          ? dayjs(meta.date).format("MMM DD, YYYY")
          : dayjs().format("MMM DD, YYYY"),
        content,
        route,
        user_name: meta.user ?? "chendap",
        brief_content: meta.description || brief || "",
        title: meta.title,
      };
    })
    .sort((a, b) => +dayjs(b.date) - +dayjs(a.date));
  return data;
};
