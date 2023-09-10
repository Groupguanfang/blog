/*
 * @Date 2023-08-28 23:50:54
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-09-10 20:23:28
 * @FilePath /Blog/docs/.vitepress/config.mts
 * Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " Zero的栈录",
  description: "一个博客，有缘关注，随缘更新；无论过去，不问将来",
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog/blog" },
      { text: "Time", link: "/time/time" },
      { text: "About", link: "/about" },
    ],
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "合集",
    darkModeSwitchLabel: "夜间模式",
    sidebar: {
      "/blog/": [
        { text: "博客", link: "/blog/blog" },
        {
          text: "哲学",
          collapsed: true,
          items: [
            { text: "想写小说...", link: "/blog/philosophy/2022-6-27-8:09" },
            { text: "内卷 OR 摆烂", link: "/blog/philosophy/2022-6-24-11:47" },
            { text: "纠纷", link: "/blog/philosophy/2023-9-10:20:22" },
            {
              text: "时间线",
              collapsed: true,
              items: [
                { text: "二二八事记", link: "/blog/philosophy/line/228" },
                { text: "二二七事记", link: "/blog/philosophy/line/227" },
                { text: "二二六事记", link: "/blog/philosophy/line/226" },
              ],
            },
          ],
        },
        {
          text: "编程",
          collapsed: true,
          items: [
            {
              text: "JavaScript",
              collapsed: true,
              items: [],
            },
            {
              text: "PHP",
              collapsed: true,
              items: [{ text: "TD主题", link: "/blog/technology/2022-6-24-9:19" }],
            },
          ],
        },
      ],
      "/time/": [
        { text: "Time", link: "/time/time" },
        {
          text: "2023",
          items: [
            { text: "诗云", link: "/time/2023/2023-7-30-15:42" },
            { text: "巨星还没有陨落，让子弹飞一会儿。", link: "/time/2023/2023-7-25-02:36" },
            { text: "一颗巨星，正在陨落。", link: "/time/2023/2023-7-23-03:44" },
            { text: "第一次给公开的仓库提贡献，已经 approved 了 这不得纪念下 (-:", link: "/time/2023/2023-7-3-12:34" },
            { text: "我坐在和他同样的位置上 像他一样笑着不知道在笑什么 但现在却只剩了我一人", link: "/time/2023/2023-7-2-22:24" },
          ],
        },
        {
          text: "2022",
          items: [
            { text: "正在写一个电视版的网易云音乐", link: "/time/2022/2022-8-15-06:36" },
            { text: "最近挺 emo 啊，以后的路不知道怎么走了", link: "/time/2022/2022-7-18-19:58" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress", ariaLabel: "VitePress" }],
  },
  vite: {
    server: {
      host: "0.0.0.0",
    },
  },
});
