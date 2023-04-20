import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import Link from "next/link";
import { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { getAllPosts, getOnePostPages } from "@/lib/getAllPost";
import { Article } from "@/types/article";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import allMDXComponents from "@/components/blogs/AllMDXComponents";
import codesandbox from "remark-codesandbox";
import remarkGfm from "remark-gfm";
interface ParamsSlug {
  slug: string[];
}

interface BlogPageProp {
  post: Article;
  params: ParamsSlug;
  source: string;
}

const Page = ({ post, params, source }: BlogPageProp) => {
  console.log(params, "PARAM");
  return (
    <section className="flex h-auto w-full justify-center flex-col p-4">
      <header>
        <nav>
          <Link href="/blog" legacyBehavior>
            <a>👈 Go back home</a>
          </Link>
        </nav>
      </header>
      <section>
        <MDXRemote {...source} components={allMDXComponents} />
      </section>
    </section>
  );
};

export const getStaticPaths = async () => {
  const post = await getAllPosts({});
  const paths = post.map((e) => ({
    params: {
      slug: e.route.split("/"),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

interface PathParams {
  params: {
    slug: Array<string>;
  };
}
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const params = context.params;
  if (params && params.slug && Array.isArray(params.slug)) {
    const post = await getOnePostPages(params.slug);
    const mdxSource = await serialize(post.content, {
      mdxOptions: {
        remarkPlugins: [[codesandbox, { mode: "button" }], [remarkGfm]],
        rehypePlugins: [],
      },
    });
    return {
      props: {
        post,
        params,
        source: mdxSource,
      },
    };
  }
  return {
    props: {
      params,
    },
  };
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
