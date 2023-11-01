import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { useTheme } from "next-themes";
import { DocSearch } from "@docsearch/react";

export const Banner = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { pathname = "/" } = useRouter();
  const data = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Posts",
      path: "/post",
    },
    {
      name: "Archives",
      path: "/archives",
    },
    {
      name: "Tags",
      path: "/tags",
    },
    {
      name: "About",
      path: "/about",
    },
  ];
  const goHome = () => {
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const title = `Chendap' Blog`;
  return (
    <section className="sticky top-0 z-10 flex h-18 w-full justify-center bg-white/50 dark:bg-gray-700 backdrop-blur">
      <section className="px-4 py-3 flex flex-row w-screen max-w-screen-xl justify-center sm:justify-between items-center ">
        <div
          onClick={goHome}
          className="cursor-pointer xs:p-2 flex flex-row items-center"
        >
          <img
            className="w-8 sm:block hidden mr-1 hover:transition hover:duration-1000 hover:ease-in-out hover:rotate-[360deg]"
            src={"/logo.png"}
            alt="MyBlog"
          />
          <span className="hidden md:inline">{title}</span>
        </div>
        <div className="flex flex-row justify-between">
          <div id="docsearch" className="mr-1 sm:mr-4">
            <DocSearch
              appId="UTFWSZD8OF"
              indexName="bythewayer"
              apiKey="2c5c49f778c42feb4c597213bacf4dc9"
            />
          </div>
          <div className="flex flex-row items-center">
            <div className="inline w-6 cursor-pointer" onClick={changeTheme}>
              {mounted &&
                (theme === "dark" ? <MdLightMode /> : <MdModeNight />)}
            </div>
            <ul className="flex flex-row ">
              {data.map((item) => {
                return (
                  <li
                    className="mr-1 md:mr-2 p-1 md:p-2 cursor-pointer hover:underline hover:underline-offset-4"
                    key={item.name}
                  >
                    <Link href={item.path}>
                      <span
                        className={clsx({
                          "text-red-600": pathname === item.path,
                          "text-underline": pathname === item.path,
                        })}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};
