import "@/styles/index.css"
import { AppPropsWithLayout } from "@/types/page"
import Router from "next/router"
import ProgressBar from "@badrap/bar-of-progress"

const progress = new ProgressBar({
  size: 2,
  color: "#38bdf8",
  className: "bar-of-progress",
  delay: 100,
})

if (typeof window !== "undefined") {
  progress.start()
  progress.finish()
}

Router.events.on("routeChangeStart", () => progress.start())
Router.events.on("routeChangeComplete", () => progress.finish())
Router.events.on("routeChangeError", () => progress.finish())

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
