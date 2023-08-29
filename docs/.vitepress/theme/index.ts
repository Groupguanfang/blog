/**
 * @Date 2023-08-28 23:50:54
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-30 01:32:43
 * @FilePath /Blog/docs/.vitepress/theme/index.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
// https://vitepress.dev/guide/custom-theme
import { h, App } from "vue";
import Theme from "vitepress/theme";
import "./style.css";
import Comment from "../components/GitTalk.vue";
import Timer from "../components/Timer.vue";
import GitHubCard from "../components/GithubCard.vue";
import { Router, SiteData } from "vitepress";

interface IEnhanceApp {
  app: App;
  router: Router;
  siteData: SiteData;
}

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }: IEnhanceApp) {
    app.component("GitTalk", Comment);
    app.component("Timer", Timer);
    app.component("GithubCard", GitHubCard);
  },
};
