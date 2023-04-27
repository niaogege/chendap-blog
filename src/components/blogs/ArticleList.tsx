import React from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import { Article } from "../../types/article";
type Props = {
  articles: Article[];
  currentPage: number;
  totalPages: number;
};
export default function ArticleList({
  articles,
  totalPages,
  currentPage,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto">
      <ul>
        {articles.map((article) => (
          <li key={article.route} className="py-4">
            <article className="px-4">
              <div className=" md:flex md:flex-row">
                <Link
                  className="md:shrink-0 overflow-hidden"
                  href={`/post/${article.route}`}
                >
                  <img
                    className="md:w-72 md:max-h-[150px] transform object-cover duration-200 hover:md:scale-110 rounded"
                    src={
                      article.featured_image ||
                      "https://www.bythewayer.com/img/vue3.webp"
                    }
                    alt={article.title}
                  />
                </Link>
                <div className="md:pl-8 mt-3">
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight cursor-pointer">
                      <Link
                        className="text-gray-900 dark:text-gray-100 hover:underline hover:underline-offset-4"
                        href={`/post/${article.route}`}
                      >
                        <p className="line-clamp-2">{article.title}</p>
                      </Link>
                    </h3>
                    <div className="mt-3 flex flex-wrap">
                      {article.tags.map((tag) => (
                        <Link key={tag.tag_name} href={`/tags/${tag.tag_path}`}>
                          <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-red-500 dark:hover:text-primary-400 cursor-pointer">
                            {tag.tag_name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm max-w-none text-gray-600 dark:text-gray-400 line-clamp-1">
                    {article.brief_content}
                  </div>
                  <time className="text-xs text-gray-400">{article.date}</time>
                  <span className="text-xs text-gray-400">
                    &nbsp; write by @{article.user_name}
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
