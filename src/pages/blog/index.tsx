import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps, NextPage } from "next";
import { getAllPosts } from "../../lib/getAllPost";

interface PostProps {
  posts: any;
}
const Page: NextPage<PostProps> = ({ posts }) => {
  console.log(posts);
  return <section className="flex h-auto w-full justify-center ">Blog</section>;
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts({});
  return {
    props: {
      posts,
    },
  };
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
