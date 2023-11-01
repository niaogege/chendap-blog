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
import { OnePage } from "./one";
import { SecondPage } from "./second";
import { ThirdPage } from "./third";
const Page = ({
  post,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="h-[100vh] w-[100vw] snap-y snap-mandatory overflow-auto">
      <OnePage />
      <SecondPage />
      <ThirdPage />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  return { props: {} };
};

export default Page;
