<script setup lang="ts">
import Default from './default.vue'

const props = defineProps<{
  title: string
  titleClass?: string
}>()

const route = useRoute()
const isPost = computed(() => route.name === 'posts-slug')

const { data: post } = await useAsyncData(
  () => isPost.value ? `post-${route.path}` : 'writing-listing',
  () => isPost.value
    ? queryCollection('posts').path(route.path).first()
    : Promise.resolve(null),
  { watch: [() => route.path] }
)

const postTitle = computed(() => post.value?.title ?? props.title)
const fromListing = useState('writing-from-listing', () => false)
const listingLeaving = useState('writing-listing-leaving', () => false)
const postLeaving = useState('writing-post-leaving', () => false)
const prefersReducedMotion = usePreferredReducedMotion()
const contentReady = ref(false)
const titleFaded = computed(() => listingLeaving.value || isPost.value)

watch(isPost, (value) => {
  if (!value) {
    fromListing.value = false
    listingLeaving.value = false
    postLeaving.value = false
    contentReady.value = false
    return
  }

  postLeaving.value = false

  if (!fromListing.value || prefersReducedMotion.value === 'reduce') {
    contentReady.value = true
    return
  }

  contentReady.value = false
  const timer = window.setTimeout(() => {
    contentReady.value = true
  }, 500)

  onWatcherCleanup(() => clearTimeout(timer))
}, { immediate: true })
</script>

<template>
  <Default :container="isPost">
    <main class="mx-3 lg:mx-0 flex flex-col items-center">
      <div class="w-full flex flex-col mx-auto max-w-200">
        <header
          class="flex w-full items-end pt-30"
          :class="isPost ? 'mb-3' : ''"
        >
          <div
            class="min-w-0 overflow-hidden prose dark:prose-invert max-w-none motion-safe:transition-opacity motion-safe:duration-320 motion-safe:ease-linear"
            :class="titleFaded ? 'opacity-0 pointer-events-none' : ''"
            :style="{ flexGrow: 1, flexBasis: '0px' }"
          >
            <h1
              class="font-serif mb-0 lg:text-5xl!"
              :class="props.titleClass"
              :aria-hidden="titleFaded"
            >
              {{ props.title }}
            </h1>
          </div>

          <div
            class="shrink-0 flex flex-col gap-3 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="isPost ? 'items-center' : 'items-end'"
          >
            <div
              class="flex items-end justify-end gap-1"
              :class="isPost ? '' : 'flex-col md:flex-row'"
            >
              <SocialLinks />
              <Operation />
            </div>
            <Navigation :class="isPost ? '' : 'hidden md:block'" />
          </div>

          <div
            class="min-w-0 overflow-hidden motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
            :style="{ flexGrow: isPost ? 1 : 0, flexBasis: '0px', flexShrink: 0 }"
          />
        </header>

        <div
          :class="isPost
            ? [
                'prose dark:prose-invert max-w-none writing-article',
                contentReady ? 'slide-enter-content' : 'h-0 overflow-hidden opacity-0 pointer-events-none'
              ]
            : 'w-full'"
          :data-leaving="postLeaving || undefined"
        >
          <h1 v-if="isPost && contentReady" :key="route.path" class="text-center">
            {{ postTitle }}
          </h1>
          <slot />
        </div>
      </div>
    </main>
  </Default>
</template>

<style>
.writing-article h2 a,
.writing-article h3 a,
.writing-article h4 a,
.writing-article h5 a,
.writing-article h6 a {
  text-decoration: none;
}

.writing-article :is(h2, h3, h4, h5, h6) {
  position: relative;
}

.writing-article :is(h2, h3, h4, h5, h6, p) {
  margin-left: 4px;
  margin-right: 4px;
}

.writing-article h2::after,
.writing-article h3::after,
.writing-article h4::after,
.writing-article h5::after,
.writing-article h6::after {
  content: "";
  display: block;
  height: 1px;
  margin-bottom: 1rem;
  position: absolute;
  left: calc(50% - 50vw);
  width: 100vw;
  border-bottom: 1px dashed #e5e7eb;
}

.dark .writing-article h2::after,
.dark .writing-article h3::after,
.dark .writing-article h4::after,
.dark .writing-article h5::after,
.dark .writing-article h6::after {
  border-bottom: 1px dashed var(--ui-color-neutral-900);
}
</style>
