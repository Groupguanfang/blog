<script setup lang="ts">
definePageMeta({
  layout: {
    name: 'listing',
    props: {
      title: 'Writing',
      titleClass: 'leading-relaxed md:leading-normal'
    }
  },
  pageTransition: {
    mode: 'out-in',
    enterActiveClass: 'transition-none',
    leaveActiveClass: 'transition-none',
    leaveToClass: 'opacity-0'
  },
  middleware(to, from) {
    const fromListing = useState('writing-from-listing', () => false)
    fromListing.value = from.name === 'posts' || from.path === '/posts'
  }
})

const { path } = useRoute()
const { data } = await useAsyncData(`post-${path}`, () => queryCollection('posts').path(path).first())
const root = useTemplateRef<HTMLElement>('root')

useSlideEnterStagger(root)

const postLeaving = useState('writing-post-leaving', () => false)
const prefersReducedMotion = usePreferredReducedMotion()

onBeforeRouteLeave(async (to, from) => {
  if (to.path === from.path) return
  if (prefersReducedMotion.value === 'reduce' || postLeaving.value) return

  postLeaving.value = true
  await new Promise(resolve => setTimeout(resolve, 320))
})
</script>

<template>
  <div ref="root">
    <ContentRenderer
      v-if="data"
      :key="path"
      class="slide-enter-blocks"
      :value="data"
    />
  </div>
</template>
