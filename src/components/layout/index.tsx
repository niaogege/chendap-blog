import { Footer } from "./footer";
// import { HeadSetting } from "@/components/head";
import { Banner } from "./banner";
import { ThemeProvider, useTheme } from "next-themes";
type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      {/* <HeadSetting /> */}
      <section className="h-18">
        <Banner />
      </section>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};
