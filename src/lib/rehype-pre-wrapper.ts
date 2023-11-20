import qs from "querystring";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

export const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      // <pre><code>...</code></pre>
      // 1. 找到 pre 元素
      if (
        node.tagName === "pre" &&
        node.children[0]?.type === "element" &&
        node.children[0].tagName === "code" &&
        !node.data?.isVisited
      ) {
        const codeNode = node.children[0];
        const codeClassName =
          codeNode.properties?.className?.toString() || "language-text";
        // language-xxx
        let meta = (codeNode.data?.meta as string) || "";
        const highlightReg = /{[\d,-]*}/i;
        const highlightMeta = highlightReg.exec(meta)?.[0];
        if (highlightMeta && codeNode.properties) {
          codeNode.properties.className = `${codeNode.properties.className} ${highlightMeta}`;
          meta = meta.replace(highlightReg, "").trim();
        }
        if (meta && meta.includes("showLineNumbers")) {
          meta = meta.replace("showLineNumbers", "").trim();
        }
        const parsedMeta = qs.parse(meta);
        const rawTitle = Array.isArray(parsedMeta.title)
          ? parsedMeta.title.join("")
          : parsedMeta.title;
        const title = rawTitle?.replace(/["'`]/g, "");
        let formatLangType = "js";
        if (codeClassName.includes(",")) {
          const types = codeClassName
            ?.split(",")
            .find((e: string) => e.includes("language-"));
          formatLangType = types.trim().replace(/language-/, "");
        }
        const clonedNode: Element = {
          type: "element",
          tagName: "pre",
          children: node.children,
          data: {
            isVisited: true,
          },
          properties: {
            style: "margin-top: 0",
          },
        };
        const formatLang: Element = {
          type: "element",
          tagName: "span",
          data: {
            isVisited: true,
          },
          properties: {
            className: "lang",
          },
          children: [
            {
              type: "text",
              value: formatLangType,
            },
          ],
        };
        // 修改原来的 pre 标签 -> div 标签
        node.tagName = "div";
        node.properties = node.properties || {};
        node.properties.className = codeClassName;
        node.children = [
          {
            type: "element",
            tagName: "div",
            properties: {
              className: title ? "modern-code-title " : "no-title",
            },
            children: [
              {
                type: "text",
                value: title ? `${title}` : "",
              },
            ],
          },
          {
            type: "element",
            tagName: "div",
            properties: {
              className: "modern-code-content",
            },
            children: [
              {
                type: "element",
                tagName: "button",
                properties: {
                  className: "copy",
                },
                children: [
                  {
                    type: "text",
                    value: "",
                  },
                ],
              },
              clonedNode,
              formatLang,
            ],
          },
        ];
      }
    });
  };
};
