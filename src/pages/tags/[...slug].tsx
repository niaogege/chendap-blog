import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { getArticles } from "../../lib/db";

const Page = ({
  data,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>{params}</h1>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query?.slug as string[];
  const page = 2;
  // 通过 API 请求数据
  const uid = process.env.uid!;
  const { data, count } = await getArticles(uid, (+page - 1) * 10);
  // 将数据传递到页面上
  return { props: { data, count, page: +page, params: slug } };
}

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
