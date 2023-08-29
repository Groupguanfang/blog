/*
 * @Date 2023-08-28 23:50:54
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-30 01:54:26
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
    ],
    sidebar: {
      "/blog/": [
        { text: "博客", link: "/blog/blog" },
        {
          text: "哲学",
          collapsed: true,
          items: [
            { text: "想写小说...", link: "/blog/philosophy/2022-6-27-8:09" },
            { text: "内卷 OR 摆烂", link: "/blog/philosophy/2022-6-24-11:47" },
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
        {
          text: "2022",
          items: [{ text: "服", link: "/time/index" }],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
