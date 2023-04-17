import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps, NextPage } from "next";
import { getAllPosts } from "../../lib/getAllPost";
import ArticleList from "@/components/blogs/ArticleList";
interface PostProps {
  post: any;
}
const Page: NextPage<PostProps> = ({ post }) => {
  return (
    <section className="flex h-auto w-full justify-center ">
      <ArticleList articles={post} />
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const post = await getAllPosts({});
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
