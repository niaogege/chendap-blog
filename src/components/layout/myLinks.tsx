import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { TbBrandJuejin } from "react-icons/tb";
export const MyLinks = () => {
  const SOCIAL_ITEMS = [
    {
      icon: <FaGithub />,
      href: "https://github.com/niaogege",
    },
    {
      icon: <TbBrandJuejin />,
      href: "https://juejin.cn/user/676954891892855",
    },
    {
      icon: <SiAboutdotme />,
      href: "/about",
    },
  ];
  return (
    <section className="flex flex-row justify-center">
      {SOCIAL_ITEMS.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.href}
            className="p-1 hover:text-red-500"
          >
            {item.icon}
          </Link>
        );
      })}
    </section>
  );
};
