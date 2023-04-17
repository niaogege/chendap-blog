import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import Link from "next/link";
import { MDXProvider } from "@mdx-js/react";
import { GetStaticProps, NextPage } from "next";
import { getAllPosts, getOnePostPages } from "@/lib/getAllPost";
import { Article } from "@/types/article";
const Page = ({ post }: { post: Article }) => {
  return (
    <section className="flex h-auto w-full justify-center flex-col p-4">
      <header>
        <nav>
          <Link href="/blog" legacyBehavior>
            <a>👈 Go back home</a>
          </Link>
        </nav>
      </header>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div>{post.route}</div>
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getOnePostPages(params.slug);
  return {
    props: {
      post,
    },
  };
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
