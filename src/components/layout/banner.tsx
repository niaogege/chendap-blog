import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
      path: "/blog",
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
  return (
    <section className="fixed z-10 flex h-18 w-full justify-center ">
      <section className="p-4 flex flex-row w-screen max-w-screen-xl justify-between items-center ">
        <div
          onClick={goHome}
          className="cursor-pointer p-2 flex flex-row items-center"
        >
          <img
            className="w-8 inline mr-1"
            src={"https://www.bythewayer.com/img/logo1.webp"}
            alt="MyBlog"
          />
          <span>Chendap' Blog</span>
        </div>
        <div className="flex flex-row items-center">
          <div className="inline w-6 cursor-pointer" onClick={changeTheme}>
            {mounted && (theme === "dark" ? <MdLightMode /> : <MdModeNight />)}
          </div>
          <ul className="flex flex-row ">
            {data.map((item) => {
              return (
                <li
                  className="mr-1 md:mr-2 p-1 md:p-2 cursor-pointer"
                  key={item.name}
                >
                  <Link href={item.path}>
                    <span
                      className={clsx({
                        "text-red-500": pathname === item.path,
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
      </section>
    </section>
  );
};
