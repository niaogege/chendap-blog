import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps, NextPage } from "next";
import { getAllPosts } from "@/lib/getAllPost";
import ArticleList from "@/components/blogs/ArticleList";
import { Article } from "@/types/article";
import { PageSEO } from "@/components/Seo";

interface PostProps {
  post: Article[];
  currentPage: number;
  totalPages: number;
}
const Page: NextPage<PostProps> = ({ post, totalPages, currentPage }) => {
  return (
    <section className="flex h-auto w-full justify-center">
      <PageSEO
        title={`chendapeng's Blog The ${currentPage} Page`}
        description={`文章第页${currentPage}`}
      />
      <ArticleList
        articles={post}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </section>
  );
};

const PAGE = 10;
export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getAllPosts({});
  const currentPage = 1;
  const totalPages = Math.ceil(post.length / PAGE);
  return {
    props: {
      post: post.slice(currentPage - 1, currentPage * PAGE),
      currentPage,
      totalPages,
    },
  };
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
