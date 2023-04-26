import { Toc } from "@/types/Toc";

interface TOCInlineProps {
  toc: Toc;
  indentDepth?: number;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 * }
 *
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = true,
  exclude = "",
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp("^(" + exclude.join("|") + ")$", "i")
    : new RegExp("^(" + exclude + ")$", "i");

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading &&
      heading.depth <= toHeading &&
      !re.test(heading.value)
  );

  const tocList = (
    <ul className="py-2 pl-2 text-sm font-medium leading-relaxed xl:border-b xl:border-gray-200  xl:dark:border-gray-700 list-disc">
      {filteredToc.map((heading) => (
        <li
          key={heading.value}
          className={`${heading.depth >= indentDepth && "ml-6"} my-1`}
        >
          <a
            className="text-primary-500 text-[var(--blog-c-text-6)] dark:text-darkPrimary hover:underline"
            href={heading.url}
          >
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {asDisclosure ? (
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg pr-8 py-2 mb-2">
          <details className="w-full">
            <summary className="ml-3 pt-2 pb-2 text-base font-medium cursor-pointer">
              Contents
            </summary>
            <div className="ml-6">{tocList}</div>
          </details>
        </div>
      ) : (
        tocList
      )}
    </>
  );
};

export default TOCInline;
