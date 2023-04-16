import matter from "gray-matter";
import glob from "fast-glob";
import fs from "fs";
// 得到根目录下的post文件夹下的所有内容

const getAllPosts = async ({ cfg }: any) => {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || "./blog";
  const files = glob.sync(`${srcDir}/**/*.md`, { ignore: ["node_modules"] });
  console.log(files, "files");
  return files;
};
getAllPosts({});
export { getAllPosts };
