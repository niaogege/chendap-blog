import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { getAllPosts } from "@/lib/getAllPost";
import { getPost } from "@/lib/getOnePost";
import { ArticlePost } from "@/types/article";
import { MDXRemote } from "next-mdx-remote";
import allMDXComponents from "@/components/blogs/AllMDXComponents";
import PostPage from "@/components/blogs/PostPage";
import TOCInline from "@/components/blogs/TOCInline";
import { useRouter } from "next/router";
import { setupCopyCodeButton } from "@/utils/code";
import { bindingWindowScroll } from "@/utils/scrollHeadr";
import { useEffect } from "react";
import { BlogSEO } from "@/components/Seo";
import GitalkComponent from "gitalk/dist/gitalk-component";
import { NoSSR } from "@/components/NoSSR";
interface ParamsSlug {
  slug: string[];
}

interface BlogPageProp {
  post: ArticlePost;
  params: ParamsSlug;
}

const Page = ({ post, params }: BlogPageProp) => {
  const router = useRouter();
  useEffect(() => {
    setupCopyCodeButton && setupCopyCodeButton();
    bindingWindowScroll && bindingWindowScroll();
  }, []);

  return (
    <section className="h-auto mx-auto p-4 px-6 max-w-4xl w-full relative">
      <BlogSEO {...post} />
      <header className="mb-4">
        <nav>
          <a
            className="font-medium hover:underline cursor-pointer"
            onClick={() => router.back()}
          >
            👈 &nbsp; Go Back
          </a>
          <div className="w-full mx-auto text-center ">
            <h1 className="text-2xl font-bold text-center mt-6 mb-6">
              {post.title}
            </h1>
            <span className="text-gray-500 italic mr-1"> {post.user_name}</span>
            <time className="text-gray-500 italic ">{post.date}</time>
          </div>
        </nav>
      </header>
      <TOCInline toc={post.toc} />
      <PostPage>
        <MDXRemote {...post.source} components={allMDXComponents} lazy={true} />
      </PostPage>
      <NoSSR>
        <GitalkComponent
          options={{
            owner: "niaogege",
            repo: "blog-comment",
            admin: ["niaogege"],
            clientID: "14358f21bfa09660100b",
            clientSecret: "96f34217eea90602cb5b142eb89508898354754c",
            labels: ["gitalk"],
            pagerDirection: "last",
            createIssueManually: true,
            distractionFreeMode: false,
            id: `${post.route}`,
          }}
        />
      </NoSSR>
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
