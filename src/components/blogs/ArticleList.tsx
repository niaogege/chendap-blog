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
  console.log(articles, "article");
  return (
    <div className="max-w-5xl mx-auto">
      <ul>
        {articles.map((article) => (
          <li key={article.article_id} className="py-4">
            <article className="px-4">
              <div className=" md:flex md:flex-row">
                <div className="md:shrink-0">
                  <img
                    className="md:w-72"
                    src={article.article_info.cover_image}
                    alt={article.article_info.title}
                  />
                </div>
                <div className="md:pl-8 mt-3">
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight cursor-pointer">
                      <Link
                        className="text-gray-900 dark:text-gray-100"
                        href={`/blog/${article.article_id}`}
                      >
                        <p>{article.article_info.title}</p>
                      </Link>
                    </h3>
                    <div className="mt-3 flex flex-wrap">
                      {article.tags.map((tag) => (
                        <Link key={tag.tag_id} href={`/tags/${tag.tag_name}`}>
                          <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-red-500 dark:hover:text-primary-400 cursor-pointer">
                            {tag.tag_name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="prose text-sm max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                    {article.article_info.brief_content}
                  </div>
                  <time className="text-xs text-gray-400">
                    {new Date(
                      +article.article_info.ctime * 1000
                    ).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-xs text-gray-400">
                    &nbsp; write by @{article.author_user_info.user_name}
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
