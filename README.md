待办计划

## 功能介绍

- 完全自定义主题，页面静态化渲染，SSG
- 如何利用 nodejs 把某一个目录下的文章转换成 Blog 目录下的页面？
- 标签页和时间线以及关于自己页面
- 评论功能，现在还不知道对接哪一个评论系统
- 根据文档自动生成网站 tag
- 国际化(中英文)
- 黑白主题切换 (借助 next-theme)
- 全局搜索，借助 **algolia**
- 输出 npm,开源

## md 文档相关

- 支持文件夹嵌套?已支持
- md 文档样式采用 [tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- [支持代码高亮,代码高亮还是好丑](https://prismjs.com/index.html)，学学人家如何做到很美观的
- md 文档支持 通过索引建立目录,toC 这个真复杂？

## 技术栈

- 基础框架 Nextjs
- 换肤 next-themes
- gray-matter：解析 md 文档
- fast-glob
- [渲染 md 文档](https://github.com/hashicorp/next-mdx-remote)
- [mdast-util-to-string](https://www.npmjs.com/package/mdast-util-to-string) mdast utility to get the text content of a node.

## 技术细节

### 文章索引

```ts
//@ts-nocheck
import { visit } from "unist-util-visit";
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";

export default function remarkTocHeadings(options) {
  return (tree: any) =>
    visit(tree, "heading", (node) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: "#" + slug(textContent),
        depth: node.depth,
      });
    });
}
```
