## 初衷

很早就想搞一个自己的博客，从头到尾，是时候展示复制粘贴的能力了！

# nextjs-mdx-blog-theme

- **View**: [demo site](https://bythewayer.com/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: 自己的服务器
- **Content**: [MDX](https://github.com/mdx-js/mdx)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Running Locally

```bash
$ git clone https://github.com/alexcarpenter/nextjs-mdx-blog-theme
$ cd nextjs-mdx-blog-theme
$ npm install
$ npm run dev:watch
```

## 功能介绍

- [x] 完全自定义主题，页面静态化渲染，SSG
- [x] 标签页和归档页以及任何想定制的页面(当然需要用户自定义开发)
- [x] 根据文档自动生成网站 tag
- [x] 黑白主题切换 (借助 next-theme)
- [x] md 文档中代码高亮,借助 prismjs
- [x] md 文档中插入自定义组件
- [x] 自动生成**rss.xml**,seo 相关
- [x] 评论功能 [gittalk](https://github.com/gitalk/gitalk)
- [x] 全局搜索，借助 [**docsearch**](https://github.com/algolia/docsearch)
- [ ] 国际化(中英文,暂时放弃)

## 写作 md 文档相关

[异步 md 文档](../tech/markdownChangeToHtml.mdx)

## 技术栈相关

- [基础框架 Nextjs13.0](https://nextjs.org/)
- [换肤 next-themes](https://github.com/pacocoursey/next-themes)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)：解析 md 文档成序列化数据， Smarter YAML front matter parser
- [fast-glob](https://github.com/mrmlnc/fast-glob): It's a very fast and efficient glob library for Node.js
- [渲染 md 文档 next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): Load mdx content from anywhere through getStaticProps in next.js

> 当时纠结了好久，用哪个 mdx 渲染器

## 后续努力方向

- 每篇文章打包完之后体积超过 128kb,也不知道哪一步导致这么大？
- 全网字体需要更换下，如何更换？
- 图片尺寸不一，需要统一裁剪
- 自动生成 rss 文件 **"build": "node ./scripts/gen-rss && next build"**
- 当前宽度小于 400px 顶部导航部分样式调整

## 技术细节

### 项目部署

卡在了 docker-compose 那里，部署上去之后，服务器上访问 3002 端口，没有成功啊,退而求其次搞个本地服务也是各种问题，最后的 nginx 配置

```shell title="nginx.conf"
    server {
        listen       80;                   #监听的端口
        server_name  bythewayer.com;
        #修改反向代理地址
        location / {
            proxy_set_header X-Nginx-Proxy true;
            proxy_set_header Connection "";
            proxy_pass http://127.0.0.1:3001; #实际提供http内容服务的地址
            proxy_redirect default;
            # root   html;                  # 默认的根目录
            #index  index.html index.htm;   # 默认的首页页面
        }
     }
```

## 借鉴，感谢各位大佬贡献的开源仓库

- [小马部落阁](https://maqib.cn/)
- [modern.js 中的 doc](https://github.com/web-infra-dev/modern.js)
- [VitePress](https://vitepress.dev/)
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss.com)
- [Lil’Log](https://lilianweng.github.io/)
- [相关图标来源](https://react-icons.github.io/react-icons/icons?name=gr)
