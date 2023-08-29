<!--
 * @Date 2023-08-29 00:59:02
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-30 00:38:16
 * @FilePath /Blog/docs/.vitepress/components/GitTalk.vue
 * Copyright (c) 2023 by Zero, All Rights Reserved.
-->
<template>
  <div class="gitalk-container">
    <div id="gitalk-container" />
  </div>
</template>

<script lang="ts">
import Gitalk from "gitalk";
import "gitalk/dist/gitalk.css";
import { GitTalkOptions } from "../publicConfig";

export default {
  name: "GitTalk",
  mounted() {
    const gitalk = new Gitalk({
      ...GitTalkOptions,
      language: "zh-CN",
    });
    gitalk.render("gitalk-container");

    const interval = setInterval(() => {
      (document.querySelectorAll(".gt-comment-like") as NodeListOf<HTMLLinkElement>).forEach((item) => {
        item.href = "javascript:void(0)";
      });
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearTimeout(timeout);
    });
  },
};
</script>

<style>
.gt-container a {
  color: var(--vp-c-indigo-1);
}

.gt-container .gt-header-textarea {
  color: #000;
}

.gt-container .gt-btn-public {
  background-color: var(--vp-c-indigo-3);
  border: var(--vp-c-indigo-1);
  transition: ease 0.2s;
}

.gt-container .gt-btn-preview {
  transition: ease 0.2s;
  background-color: #ebebef;
  border-color: transparent;
}

.gt-container .gt-btn-preview:hover {
  transition: ease 0.2s;
  background-color: #dcdcdd;
  border-color: transparent;
}

html.dark .gt-container .gt-btn-preview {
  transition: ease 0.2s;
  background-color: #32363f;
  border-color: #32363f;
}

html.dark .gt-container .gt-btn-preview:hover {
  transition: ease 0.2s;
  background-color: #414853;
  border-color: #414853;
}

.gt-container .gt-btn-public:hover {
  transition: ease 0.2s;
  background-color: var(--vp-c-indigo-2);
}

html.dark .gt-container .gt-meta {
  border-bottom: 1px solid #fff0;
}

.gt-container .gt-link {
  border-bottom: none;
}

.gt-container .gt-comment-admin .gt-comment-content {
  background-color: #f6f6f7;
  border: 1px solid transparent;
  border-radius: 8px;
}

html.dark .gt-container .gt-comment-admin .gt-comment-content {
  border-color: #2e2e32;
  background-color: transparent;
}

.gt-container .gt-comment-content:hover {
  box-shadow: none;
  -webkit-box-shadow: none;
  border-color: #e2e2e3;
}

html.dark .gt-container .gt-comment-content:hover {
  border-color: var(--vp-c-indigo-1);
}

html.dark .gt-container .gt-comment-body {
  color: #fff !important;
}

html.dark .gt-container .gt-avatar img {
  border-radius: 8px;
}

html.dark .gt-container .gt-header-textarea {
  background: transparent;
  border-color: #2e2e32;
  color: #fff;
}

html.dark .gt-container .gt-header-textarea:focus,
html.dark .gt-container .gt-header-textarea:hover {
  border-color: var(--vp-c-indigo-1);
}

html.dark .gt-container .gt-user .gt-ico {
  filter: invert(1);
}

.gt-container .gt-popup {
  -webkit-box-shadow: 0 0 20px #3451b224;
  box-shadow: 0 0 20px #3451b224;
  border: none;
  border-radius: 8px;
  top: 3em;
}

html.dark .gt-container .gt-popup {
  -webkit-box-shadow: 0 0 20px #ffffff0a;
  box-shadow: 0 0 20px #ffffff0a;
  background-color: #161618;
}

html.dark .gt-container .gt-copyright {
  border-top: 1px solid #2e2e32;
}
</style>
