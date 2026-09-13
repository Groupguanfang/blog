<script setup lang="ts">
defineProps<{
  src: string;
  name: string;
  bio: string;
}>();
</script>

<template>
  <div class="px-2 py-1">
    <div class="flex items-center gap-2">
      <UAvatar :src size="lg" />
      <div class="flex flex-col justify-between">
        <div class="text-base font-medium">{{ name }}</div>
        <div class="text-[11px] opacity-50">{{ bio }}</div>
      </div>
    </div>
    <USeparator v-if="$slots.bottom" class="my-1" />
    <slot name="bottom" />
  </div>
</template>