import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
function Test() {
  return <div className="text-red-400 text-base">This Is CPP </div>;
}
const allMDXComponents = {
  Test,
  a: (props: { href: string; children: React.ReactElement }) => {
    return (
      <Link className="inline-flex items-center" href={props.href}>
        {props.children}
        <FiExternalLink />
        <span>This is CPP</span>
      </Link>
    );
  },
};
export default allMDXComponents;
