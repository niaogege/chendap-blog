/*
 * @Author: Chendapeng
 * @Date: 2023-02-25 18:46:33
 * @LastEditors: Chendapeng
 * @LastEditTime: 2023-04-22 23:55:18
 * @Description:
 */
import { execSync, spawn } from "child_process";
import { formatDate } from "./time";
export function getDefaultTitle(content: string) {
  const title =
    clearMatterContent(content)
      .split("\n")
      ?.find((str) => {
        return str.startsWith("# ");
      })
      ?.slice(2)
      .replace(/[\s]/g, "") || "";
  return title;
}

export function clearMatterContent(content: string) {
  let first___: unknown;
  let second___: unknown;

  const lines = content.split("\n").reduce<string[]>((pre, line) => {
    // 移除开头的空白行
    if (!line.trim() && pre.length === 0) {
      return pre;
    }
    if (line.trim() === "---") {
      if (first___ === undefined) {
        first___ = pre.length;
      } else if (second___ === undefined) {
        second___ = pre.length;
      }
    }
    pre.push(line);
    return pre;
  }, []);
  return (
    lines
      // 剔除---之间的内容
      .slice((second___ as number) || 0)
      .join("\n")
  );
}

/**
 * @author: Chendapeng
 * @description: 文档生成时间
 * @param {string} url
 * @return {*}
 */
export function getFileBirthTime(url: string) {
  let date = new Date();

  try {
    // 参考 vitepress 中的 getGitTimestamp 实现
    const infoStr = execSync(`git log -1 --pretty="%ci" ${url}`)
      .toString("utf-8")
      .trim();
    if (infoStr) {
      date = new Date(infoStr);
    }
  } catch (error) {
    return formatDate(date);
  }

  return formatDate(date);
}
/**
 * @author: Chendapeng
 * @description: 获得git上时间戳
 * @param {string} file
 * @return {*}
 */
export function getGitTimestamp(file: string) {
  return new Promise((resolve, reject) => {
    const child = spawn("git", ["log", "-1", '--pretty="%ci"', file]);
    let output = "";
    child.stdout.on("data", (d) => {
      output += String(d);
    });
    child.on("close", () => {
      resolve(+new Date(output));
    });
    child.on("error", reject);
  });
}

/**
 * @author: Chendapeng
 * @description: 获得文章主要内容
 * @param {string} text
 * @param {*} count
 * @return {*}
 */
export function getTextSummary(text: string, count = 100) {
  const afterText = clearMatterContent(text);
  const lastText = afterText
    .match(/^([\s\S]+)/m)?.[1]
    // 除去标题
    ?.replace(/#/g, "")
    // 除去图片
    ?.replace(/!\[.*?\]\(.*?\)/g, "")
    // 除去链接
    ?.replace(/\[(.*?)\]\(.*?\)/g, "$1")
    // 除去加粗
    ?.replace(/\*\*(.*?)\*\*/g, "$1")
    ?.split("\n")
    ?.filter((v) => !!v)
    ?.slice(1)
    ?.join("\n")
    ?.replace(/>(.*)/, "")
    ?.slice(0, count);
  return lastText;
}
