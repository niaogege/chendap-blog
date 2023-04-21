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
      <Banner />
      <section className="felx flex-col justify-between antialiased">
        {/* <HeadSetting /> */}
        <main className="mb-auto">{children}</main>
        <Footer />
      </section>
    </ThemeProvider>
  );
};
