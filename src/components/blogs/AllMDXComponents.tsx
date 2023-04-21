import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

function Test() {
  return <div className="text-red-400 text-base">This Is CPP </div>;
}

function Callout(props) {
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg pl-4 pr-8 py-2 mb-2">
      <div className="flex items-center w-2 mr-2">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

const CustomLink = (props) => (
  <a
    className="text-gray-900 dark:text-blue-400 dark:underline hover:underline break-words"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

const allMDXComponents = {
  a: CustomLink,
  Test,
  Callout,
};
export default allMDXComponents;
