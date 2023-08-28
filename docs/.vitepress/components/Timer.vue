<script setup lang="ts">
defineProps<{
  time: string;
  location: string;
}>();
</script>

<template>
  <div class="timer" align="right">
    <hr />
    <p>最后编辑：{{ time }}</p>
    <p>于 {{ location }}</p>
    <hr />
  </div>
</template>

<style scoped>
.timer {
  font-weight: 600;
}
</style>
