/*
 * @Date 2023-08-28 23:50:54
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-29 00:54:46
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
      { text: "Blog", link: "/blog/philosophy/2022-6-24" },
      { text: "Time", link: "/time" },
    ],
    sidebar: [
      {
        text: "哲学",
        items: [{ text: "内卷 OR 摆烂", link: "/blog/philosophy/2022-6-24" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
