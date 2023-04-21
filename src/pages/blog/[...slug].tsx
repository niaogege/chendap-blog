import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import Link from "next/link";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { getAllPosts } from "@/lib/getAllPost";
import { getPost } from "@/lib/getOnePost";
import { ArticlePost } from "@/types/article";
import { MDXRemote } from "next-mdx-remote";
import allMDXComponents from "@/components/blogs/AllMDXComponents";
import PostPage from "@/components/blogs/PostPage";
import TOCInline from "@/components/blogs/TOCInline";
import { log } from "console";
interface ParamsSlug {
  slug: string[];
}

interface BlogPageProp {
  post: ArticlePost;
  params: ParamsSlug;
}

const Page = ({ post, params }: BlogPageProp) => {
  return (
    <section className="h-auto mx-auto p-4 max-w-4xl w-full">
      <header className="mb-2">
        <nav>
          <Link href="/blog" legacyBehavior>
            <a>👈 &nbsp; Go Back</a>
          </Link>
          <div className="w-full mx-auto text-center">
            <h1 className="text-2xl font-bold text-center mt-6 mb-6">
              {post.title}
            </h1>
            <span className="text-gray-500 italic mr-1"> {post.user_name}</span>
            <time className="text-gray-500 italic">{post.date}</time>
          </div>
        </nav>
      </header>
      <TOCInline toc={post.toc} />
      <PostPage>
        <MDXRemote {...post.source} components={allMDXComponents} lazy={true} />
      </PostPage>
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
  console.log(paths, "paths");
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const params = context.params;
  if (params && params.slug && Array.isArray(params.slug)) {
    const post = await getPost(params.slug);
    return {
      props: {
        post,
        params,
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
