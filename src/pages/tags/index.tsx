import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { GetStaticProps } from "next";
import { getAllTags } from "@/lib/getAllTags";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

const Page = ({ tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col items-start justify-start max-w-5xl mx-auto h-[calc(100vh-120px)] min-h-min p-4">
      <div className="text-center py-4 font-bold text-lg">Tags 标签</div>
      <div>
        {Object.keys(tags).map((tag) => {
          return (
            <Link
              key={tag}
              className="inline-block p-2 mr-2 my-2 border-test hover:bg-red-400 hover:text-white cursor-pointer"
              href={`/tags/${tag}`}
            >
              {tag}({tags[tag]})
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticProps) {
  const tags = await getAllTags();
  return { props: { tags } };
}

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
