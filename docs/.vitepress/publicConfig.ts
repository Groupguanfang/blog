/**
 * @Date 2023-08-29 22:26:30
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-29 22:26:53
 * @FilePath /Blog/docs/.vitepress/publicConfig.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import Gitalk from "gitalk";
import md5 from "md5";

const devOptions: Gitalk.GitalkOptions = {
  clientID: "969e0f4ea438621c51ee",
  clientSecret: "041b70eacbfc72b7a4f8352676ba13c37e663d8b",
  repo: "blog",
  owner: "Groupguanfang",
  admin: ["Groupguanfang"],
  id: md5(location.pathname),
  distractionFreeMode: false,
};

const proOptions: Gitalk.GitalkOptions = {
  clientID: "18fdf73b31f116d0fa14",
  clientSecret: "e1630d230e9e0b786ba638a8844c1f9faad21839",
  repo: "blog",
  owner: "Groupguanfang",
  admin: ["Groupguanfang"],
  id: md5(location.pathname),
  distractionFreeMode: false,
};

export const GitTalkOptions: Gitalk.GitalkOptions = devOptions;
