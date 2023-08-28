/**
 * @Date 2023-08-28 23:50:54
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-29 01:01:04
 * @FilePath /Blog/docs/.vitepress/theme/index.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";
import Comment from "../components/GitTalk.vue";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("GitTalk", Comment);
  },
};
