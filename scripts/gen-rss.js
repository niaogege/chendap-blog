const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");
const { promises: fs } = require("fs");

async function generate() {
  const feed = new RSS({
    title: "chendap's Blog",
    site_url: "https://bythewayer.com/",
    feed_url: "https://bythewayer.com/feed.xml",
    cdata: false,
  });

  const posts = await fs.readdir(path.join(__dirname, "..", "post"));
  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith("index.")) return;

      const content = await fs.readFile(
        path.join(__dirname, "..", "posts", name)
      );
      const frontmatter = matter(content);
      console.log(frontmatter.data.title, "frontmatter.data.title");
      feed.item({
        title: frontmatter.data.title,
        url: "/post/" + name.replace(/\.mdx?/, ""),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tags.split(", "),
        author: frontmatter.data.author || "chendap",
      });
    })
  );

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
