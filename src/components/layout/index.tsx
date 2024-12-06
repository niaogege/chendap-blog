import { Footer } from "./footer"
import { Banner } from "./banner"
import { ThemeProvider, useTheme } from "next-themes"
import dynamic from "next/dynamic"
import React, { useEffect } from "react"

import Head from "next/head"
type LayoutProps = {
  children: React.ReactNode
}
const DynamicHeader = dynamic(() => import("@/components/layout/BackTop"), {
  loading: () => <p>Loading...</p>,
})
export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    if ("serviceWorker" in window.navigator) {
      navigator.serviceWorker
        .register("./sw.js", { scope: "./" })
        .then(function (reg) {
          console.log("sw success", reg)
        })
        .catch(function (err) {
          console.log("sw fail", err)
        })
    }
  }, [])

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
        <DynamicHeader />
      </section>
    </ThemeProvider>
  )
}
