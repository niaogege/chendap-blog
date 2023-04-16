import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";

const Page = () => {
  return <section className="flex h-auto w-full justify-center">About</section>;
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
