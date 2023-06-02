import { Footer } from "./footer";
import { Banner } from "./banner";
import { ThemeProvider, useTheme } from "next-themes";
import { BackTop } from "@/components/layout/BackTop";

import Head from "next/head";
type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {/* <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9163539254569883"
        crossOrigin="anonymous"
      /> */}
      <Banner />
      <section className="felx flex-col justify-between antialiased relative">
        <main className="mb-auto">{children}</main>
        <Footer />
        <BackTop />
      </section>
    </ThemeProvider>
  );
};
