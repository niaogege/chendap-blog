import { NextPageWithLayout } from "@/types/page";
import { Layout } from "@/components/layout";

const Page = () => {
  return (
    <section className="flex flex-col border-test items-start justify-start max-w-5xl mx-auto h-[calc(100vh-120px)] min-h-min p-4">
      档案页面
    </section>
  );
};

(Page as NextPageWithLayout).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default Page;
