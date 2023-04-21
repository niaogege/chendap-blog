import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/lib/getAllPost";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
const Page = ({ tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col items-start justify-start max-w-5xl mx-auto h-[calc(100vh-120px)] min-h-min p-4">
      <div className="text-center py-4 font-bold text-lg">Tags 标签</div>
      <div>
        {tags.map((tag) => {
          return (
            <Link
              key={tag.tag_path}
              className="inline-block p-2 mr-2 my-2 border-test hover:bg-red-400 hover:text-white cursor-pointer"
              href={`/tags/${tag.tag_path}`}
            >
              {tag.tag_name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticProps) {
  // 通过 API 请求数据
  const post = await getAllPosts({});
  const tags = post
    .map((e) => {
      return e.tags;
    })
    .flat();
  // 将数据传递到页面上
  return { props: { tags } };
}

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
