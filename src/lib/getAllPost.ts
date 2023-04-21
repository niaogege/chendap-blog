import matter from "gray-matter";
import glob from "fast-glob";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import kebabCase from "@/utils/kebabCase";

// 得到根目录下的post文件夹下的所有内容
export const getAllPosts = async ({ cfg }: any) => {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || "./blog";
  const files = glob.sync(`${srcDir}/**/*.mdx`, { ignore: ["node_modules"] });
  const data = files
    .map((v) => {
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
      const tags = meta.tags.split(",").map((e) => ({
        tag_name: e.trim(),
        tag_path: `${kebabCase(e.trim())}`,
      }));
      return {
        ...meta,
        tags,
        tag: meta.tags.split(","),
        date: dayjs(meta.date).format("MMM DD, YYYY"),
        content,
        route,
        user_name: meta.user ?? "chendap",
      };
    })
    .sort((a, b) => +dayjs(b.date) - +dayjs(a.date));
  return data;
};
