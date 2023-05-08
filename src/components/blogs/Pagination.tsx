import Link from "next/link";

import { GrPrevious, GrNext } from "react-icons/gr";
interface Props {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5 mx-4">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            <GrPrevious />
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1 ? `/post/` : `/post/page/${currentPage - 1}`
            }
          >
            <button>
              <GrPrevious />
            </button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            <GrNext />
          </button>
        )}
        {nextPage && (
          <Link href={`/post/page/${currentPage + 1}`}>
            <button>
              <GrNext />
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}
