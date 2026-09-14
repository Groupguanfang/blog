<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>(), {
  src: '',
  alt: ''
})

const route = useRoute()
const refinedSrc = computed(() => resolveContentImage(props.src, route.path) ?? props.src)
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <img
      :src="refinedSrc"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      class="w-full my-0!"
    >
    <span class="text-xs text-gray-500">{{ props.alt }}</span>
  </div>
</template>
