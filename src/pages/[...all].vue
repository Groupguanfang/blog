<script setup lang="tsx">
useHead({
  title: '404',
})
</script>

<template>
  <div h-screen flex flex-col items-center justify-center>
    <h1 text-size-5xl font-extrabold>
      404
    </h1>
    <p op-70>
      什么都没有找到哦
    </p>
    <div mt4 flex gap-3>
      <button
        p="x3.5 y1.5" border="1 gray" cursor-pointer rounded-md text-size-sm
        @click="$router.back()"
      >
        返回
      </button>
      <button
        p="x3.5 y1.5" border="1 gray" cursor-pointer rounded-md
        @click="$router.push('/')"
      >
        首页
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: Blank
</route>
