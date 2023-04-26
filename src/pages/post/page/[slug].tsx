import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import {
  GetStaticProps,
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
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
    <section className="flex h-auto w-full justify-center relative">
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

const PAGE = 5;

export const getStaticPaths: GetStaticPaths<{
  slug: string;
}> = async () => {
  const post = await getAllPosts({});
  const totalPages = Math.ceil(post.length / PAGE);
  const arr: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    arr.push(i);
  }
  const paths = arr.map((e) => {
    return {
      params: {
        slug: `${e}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: GetStaticPropsContext) => {
  const currentPage = +slug;
  const post = await getAllPosts({});
  const totalPages = Math.ceil(post.length / PAGE);
  return {
    props: {
      post: post.slice((currentPage - 1) * PAGE, currentPage * PAGE),
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
