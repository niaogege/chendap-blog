import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/lib/getAllPost";
import { InferGetStaticPropsType } from "next";
import kebabCase from "@/utils/kebabCase";
const Page = ({
  post,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <h1>This is CPPP</h1>
      <h1>{tag}</h1>
      <h1>{post.length}</h1>
    </div>
  );
};

export const getStaticPaths = async () => {
  const post = await getAllPosts({});

  const paths = post.map((e) => {
    console.log(e.tag, "e.tag");
    return {
      params: {
        slug: e.tag.map((item) => item),
      },
    };
  });
  console.log(paths, "paths");
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context: GetStaticProps) {
  const post = await getAllPosts({});
  const tag = context.params.slug as string;
  const filteredPosts = post.filter((post) =>
    post.tags.map((t) => kebabCase(t)).includes(tag)
  );
  // 将数据传递到页面上
  return { props: { post: filteredPosts, tag } };
}

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
