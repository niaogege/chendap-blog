import { MyLinks } from "./myLinks";
export const Footer = () => {
  return (
    <footer className="text-center py-4">
      <MyLinks />
      <p className="text-xs text-gray-600 dark:text-darkPrimary">
        @2023 Chendap Blog Powered by
        <a
          href="https://github.com/niaogege/chendap-blog"
          className="underline underline-offset-4"
        >
          {" "}
          Chendap Theme
        </a>
      </p>
    </footer>
  );
};
