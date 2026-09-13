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
    enterFromClass: 'opacity-0',
    enterActiveClass: 'transition-opacity duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
    enterToClass: 'opacity-100',
    leaveActiveClass: 'transition-none'
  }
})

const { data: posts } = await useAsyncData('posts', () => queryCollection('posts').all())

const fading = ref(false)
const listingLeaving = useState('writing-listing-leaving', () => false)
const prefersReducedMotion = usePreferredReducedMotion()

async function goToPost(path: string) {
  if (fading.value) return

  if (prefersReducedMotion.value !== 'reduce') {
    fading.value = true
    listingLeaving.value = true
    await new Promise(resolve => setTimeout(resolve, 320))
  }

  await navigateTo(path)
}

function onCardClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  const link = (event.target as HTMLElement | null)?.closest?.('a[href]')
  const href = link?.getAttribute('href')
  if (!href?.startsWith('/posts/')) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  goToPost(href)
}
</script>

<template>
  <div>
    <div
      class="writing-cards w-full transition-opacity duration-320 ease-linear motion-reduce:transition-none"
      :class="fading ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      @click.capture="onCardClick"
    >
      <UBlogPosts class="mt-10 lg:grid-cols-2 transition-all gap-3">
        <UBlogPost
          class="rounded-none transition-all"
          v-for="(post, index) in posts"
          :key="index"
          v-bind="post"
          :to="post.path"
          :image="resolveContentImage(post.meta.image as string)"
        />
      </UBlogPosts>
    </div>
  </div>
</template>
