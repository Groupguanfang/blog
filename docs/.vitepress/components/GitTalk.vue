<!--
 * @Date 2023-08-29 00:59:02
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-29 01:35:01
 * @FilePath /Blog/docs/.vitepress/components/GitTalk.vue
 * Copyright (c) 2023 by Zero, All Rights Reserved.
-->
<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script lang="ts">
import md5 from "md5";
import Gitalk from "gitalk";
import "gitalk/dist/gitalk.css";

export default {
  name: "GitTalk",
  mounted() {
    const gitalk = new Gitalk({
      clientID: "18fdf73b31f116d0fa14",
      clientSecret: "e1630d230e9e0b786ba638a8844c1f9faad21839",
      repo: "blog",
      owner: "Groupguanfang",
      admin: ["Groupguanfang"],
      id: md5(location.pathname) as string,
      distractionFreeMode: false,
    });
    gitalk.render("gitalk-container");
  },
};
</script>

<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>
