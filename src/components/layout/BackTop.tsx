import { useEffect, useState } from "react";
import { GrLinkTop } from "react-icons/gr";
import clsx from "clsx";
const BackTop = () => {
  // 滚动到视口一半高度的时候出现
  const [show, setShow] = useState(false);
  useEffect(() => {
    const scrollToTop = () => {
      const currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
      }
    };

    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
      backToTopButton.addEventListener("click", scrollToTop);
      return () => {
        backToTopButton.removeEventListener("click", scrollToTop);
      };
    }
  }, []);
  useEffect(() => {
    const counPx = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    document.addEventListener("scroll", counPx);
    return () => {
      document.removeEventListener("scroll", counPx);
    };
  }, []);
  return (
    <>
      {show ? (
        <div
          id="back-to-top"
          className={clsx(
            "fixed bottom-10 right-6 md:right-12 flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-homebg dark:bg-slate-600 transition-all duration-1000",
            {
              "opacity-0": !show,
            }
          )}
        >
          <GrLinkTop width={24} height={24} />
        </div>
      ) : null}
    </>
  );
};

export default BackTop;
