<script setup lang="ts">
import Default from './default.vue'

defineProps<{
  title: string;
}>();
</script>

<template>
  <Default>
    <main class="mx-3 lg:mx-0 flex flex-col items-center">
      <div class="w-full flex flex-col max-w-200">
        <div class="pt-30 prose dark:prose-invert max-w-none flex items-end justify-between w-full">
          <h1 class="font-serif mb-0 lg:text-5xl! transition-all">{{ title }}</h1>
          <Navigation class="hidden md:block" />
        </div>
        <div class="w-full">
          <slot />
        </div>
      </div>
    </main>
  </Default>
</template>