import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { getAllTags } from "@/lib/getAllTags";
import { getAllPosts } from "@/lib/getAllPost";
import { InferGetStaticPropsType } from "next";
import kebabCase from "@/utils/kebabCase";
import ArticleList from "@/components/blogs/ArticleList";
import { Article } from "@/types/article";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
const Page = ({
  post,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col mx-auto p-4 max-w-4xl w-full">
      <ArticleList articles={post} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags();
  const paths = Object.keys(tags).map((e) => {
    return {
      params: {
        slug: e,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  post: Article[];
  tag: string;
}> = async ({ params = {} }) => {
  const post = await getAllPosts({});
  const tag = params.slug as string;
  const filteredPosts = post.filter((post) =>
    post.tag.map((t: string) => kebabCase(t.trim())).includes(tag)
  );
  // 将数据传递到页面上
  return { props: { post: filteredPosts, tag } };
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
