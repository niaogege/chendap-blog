interface PostPageProp {
  children: React.ReactElement;
}
// md格式采用tailwindcss @tailwindcss/typography https://tailwindcss.com/docs/typography-plugin
const PostPage = ({ children }: PostPageProp) => {
  return (
    <div className="prose prose-base max-w-none prose-slate dark:prose-invert">
      {children}
    </div>
  );
};

export default PostPage;
