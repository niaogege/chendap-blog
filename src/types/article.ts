import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Toc } from "@/types/Toc";

export interface Article {
  route: string;
  title: string;
  brief_content: string;
  content: string;
  cover_image?: string;
  featured_image?: string;
  // 创建时间
  date: string;
  tags: Tag[];
  user_name?: string;
}

export interface ArticlePost extends Article {
  source: MDXRemoteSerializeResult;
  toc: Toc;
}

export interface ArticleInfo {
  // 文章id
  article_id: string;
  ctime: string;
  mtime: string;
  rtime: string;
  view_count: number;
  collect_count: number;
  digg_count: number;
  comment_count: number;
  mark_content: string;
}

export interface Tag {
  // id: number;
  // tag_id: string;
  tag_name: string;
  tag_path: string;
}
