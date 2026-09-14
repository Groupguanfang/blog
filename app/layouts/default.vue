<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { container = false } = defineProps<{
  container?: boolean
}>()
</script>

<template>
  <div class="flex flex-col items-center w-full px-3 md:px-10">
    <div class="border-b w-full border-gray-200 dark:border-neutral-900 border-dashed mt-3 md:mt-10 absolute top-0 left-0 -z-1" />
    <div
      v-bind="$attrs"
      class="relative flex flex-col w-full border-x border-gray-200 dark:border-neutral-900 border-dashed motion-safe:transition-[max-width] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="container ? 'max-w-180' : 'max-w-full'"
    >
      <div class="pointer-events-none absolute inset-y-0 right-full z-10 hidden xl:block">
        <div class="pointer-events-auto sticky top-32 w-52 max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain">
          <slot name="left" />
        </div>
      </div>
      <slot />
      <div class="pointer-events-none absolute inset-y-0 left-full z-10 hidden xl:block">
        <div class="pointer-events-auto sticky top-32 w-52 max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain">
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>
