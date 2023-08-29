<!--
 * @Date 2023-08-30 01:30:00
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-30 01:41:27
 * @FilePath /Blog/docs/.vitepress/components/GithubCard.vue
 * Copyright (c) 2023 by Zero, All Rights Reserved.
-->
<script setup lang="ts">
import { Github } from "@vicons/fa";

defineProps<{
  uri: string;
  desc: string;
}>();
</script>

<template>
  <a :href="`https://github.com/${uri}`" target="_blank" class="github_card_link">
    <div class="github-card">
      <div class="title"><Github style="width: 14px" /> Github</div>
      <p class="uriTitle">{{ uri }}</p>
      <p style="margin-bottom: 0">{{ desc }}</p>
    </div>
  </a>
</template>

<style scoped>
.github_card_link {
  text-decoration: none;
}

.github-card {
  background-color: #24292f;
  padding: 18px 28px;
  border-radius: 8px;
}

.github-card .title {
  display: flex;
  gap: 5px;
  align-items: center;
}

.github-card .uriTitle {
  font-weight: 800;
  font-size: 22px;
}
</style>
