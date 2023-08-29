<script setup lang="ts">
defineProps<{
  time?: string;
  location?: string;
  publishTime?: string;
}>();
</script>

<template>
  <div class="timer" align="right">
    <hr />
    <p v-if="publishTime">发布时间：{{ publishTime }}</p>
    <p v-if="time">最后编辑：{{ time }}</p>
    <p v-if="location">于 {{ location }}</p>
    <hr />
  </div>
</template>

<style scoped>
.timer {
  font-weight: 600;
}
</style>
