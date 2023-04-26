import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// layoutProps: {
//   meta: {
//     title: string;
//     ogTitle?: string;
//     description: string;
//     image?: string;
//     ogImage?: string;
//     ogDescription?: string;
//   };
// };

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
