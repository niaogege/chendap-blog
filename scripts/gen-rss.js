// import fs from "fs";
// import ReactDOMServer from "react-dom/server";
// import { MDXRemote } from "next-mdx-remote";
// import { Feed } from "feed";
// import { getAllPosts } from "../src/lib/getAllPost";
// import allMDXComponents from "../src/components/blogs/AllMDXComponents";
const ReactDOMServer = require("react-dom/server");
const { MDXRemote } = require("next-mdx-remote");
const { getAllPosts } = require("../src/lib/getAllPost");
const allMDXComponents = require("../src/components/blogs/AllMDXComponents");
const { promises: fs } = require("fs");
const { Feed } = require("feed");

export default function buildRss() {
  const baseUrl = "https://bythewayer.com";
  const blogUrl = `${baseUrl}/blog`;

  const feed = new Feed({
    title: "Tailwind CSS Blog",
    description: "All the latest Tailwind CSS news, straight from the team.",
    id: blogUrl,
    link: blogUrl,
    language: "en",
    // image: `${baseUrl}/favicons/favicon-32x32.png?v=3`,
    // favicon: `${baseUrl}/favicons/favicon.ico?v=3`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Tailwind Labs`,
    feedLinks: {
      rss: `${baseUrl}/feeds/feed.xml`,
      json: `${baseUrl}/feeds/feed.json`,
      atom: `${baseUrl}/feeds/atom.xml`,
    },
    author: {
      name: "Chendap",
      link: "https://github.com/niaogege",
    },
  });

  getAllPosts().forEach(({ route: slug, title, source, featured_image }) => {
    const mdx = (
      <MDXRemote source={source} components={allMDXComponents} lazy={true} />
    );
    const html = ReactDOMServer.renderToStaticMarkup(mdx);
    const postText = `<p><em>(The post <a href="${blogUrl}/${slug}">${title}</a> appeared first on <a href="${blogUrl}">Tailwind CSS Blog</a>.)</em></p>`;

    let image = featured_image ?? "https://www.bythewayer.com/img/prismjs.webp";

    feed.addItem({
      title: meta.title,
      id: meta.title,
      link: `${blogUrl}/${slug}`,
      description: meta.description,
      content: html + postText,
      author: {
        name: "chendap",
        link: `https://github.com/niaogege`,
      },
      date: new Date(meta.date),
      image,
      ...(meta.discussion
        ? {
            comments: meta.discussion,
            extensions: [
              {
                name: "_comments",
                objects: {
                  about: "Link to discussion forum",
                  comments: meta.discussion,
                },
              },
            ],
          }
        : {}),
    });
  });

  fs.mkdirSync("./public/feeds", { recursive: true });
  fs.writeFileSync("./public/feeds/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feeds/atom.xml", feed.atom1());
  fs.writeFileSync("./public/feeds/feed.json", feed.json1());
}
