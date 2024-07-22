<script setup lang="tsx">
useHead({
  meta: [
    { name: 'theme-color', content: computed(() => isDark.value ? '#000000' : '#ffffff') },
  ],
})
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
