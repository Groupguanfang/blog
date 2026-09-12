<script setup lang="ts">
import type { NuxtError } from '#app';
import Default from './layouts/default.vue';

defineProps<{
  error: NuxtError;
}>();

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <Default>
    <main class="flex flex-col justify-center items-center h-screen">
      <div class="w-full max-w-200 prose dark:prose-invert flex flex-col items-center justify-between">
        <h1 class="font-serif mb-0">Error</h1>
        <p class="text-center opacity-50 mt-3 mb-0">{{ error.statusText }}</p>
        <Navigation class="hidden md:block mt-3" />
      </div>
    </main>
  </Default>
</template>