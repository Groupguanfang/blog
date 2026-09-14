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
      class="writing-cards w-full transition-opacity duration-320 ease-linear motion-reduce:transition-none px-3"
      :class="fading ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      @click.capture="onCardClick"
    >
      <div class="blog-post-hatch" aria-hidden="true" />
      <UBlogPosts class="mt-10 overflow-visible lg:grid-cols-2 transition-all gap-3">
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="blog-post-item"
        >
          <UBlogPost
            class="relative z-1 rounded-none h-full transition-all hover:bg-default hover:ring-black dark:hover:ring-white"
            v-bind="post"
            :to="post.path"
            :image="resolveContentImage(post.meta.image as string, post.path)"
          />
        </div>
      </UBlogPosts>
    </div>
  </div>
</template>

<style scoped>
.writing-cards {
  position: relative;
}

.blog-post-item {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
}

.blog-post-item::before,
.blog-post-item::after {
  content: "";
  display: block;
  height: 1px;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  top: -1px;
  left: -100vw;
  width: 300vw;
  border-bottom: 1px dashed #e5e7eb;
}

.blog-post-item::after {
  top: auto;
  bottom: -1px;
}

.blog-post-hatch {
  pointer-events: none;
  position: absolute;
  z-index: 0;
  inset-block: 0;
  left: 50%;
  width: calc(100vw - 2 * var(--layout-gutter, 0.75rem));
  transform: translateX(-50%);
  background: repeating-linear-gradient(
    -45deg,
    #e5e7eb 0 1px,
    transparent 1px 6px
  );
}

.dark .blog-post-item::before,
.dark .blog-post-item::after {
  border-bottom: 1px dashed var(--ui-color-neutral-900);
}

.dark .blog-post-hatch {
  background: repeating-linear-gradient(
    -45deg,
    var(--ui-color-neutral-900) 0 1px,
    transparent 1px 6px
  );
}

@media (min-width: 640px) {
  .blog-post-item:nth-child(even)::before,
  .blog-post-item:nth-child(even)::after {
    content: none;
  }
}
</style>