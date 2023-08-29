<script setup lang="ts">
defineProps<{
  time?: string;
  location?: string;
  publishTime?: string;
  publishLocation?: string;
}>();
</script>

<template>
  <div class="timer" align="right">
    <hr />
    <p>
      <span v-if="publishTime">发布时间：{{ publishTime }}</span>
      <span v-if="publishLocation"> 于 {{ publishLocation }}</span>
    </p>
    <p>
      <span v-if="time">最后编辑：{{ time }}</span>
      <span v-if="location"> 于 {{ location }}</span>
    </p>
    <hr />
  </div>
</template>

<style scoped>
.timer {
  font-weight: 600;
}
</style>
