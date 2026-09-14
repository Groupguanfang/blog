<script setup lang="ts">
import Default from './default.vue'

const props = defineProps<{
  title: string
  titleClass?: string
}>()

const route = useRoute()
const isPost = computed(() => route.name === 'posts-slug')

const { data: post } = await useAsyncData(() => isPost.value ? `post-${route.path}` : 'writing-listing', () => {
  return isPost.value
    ? queryCollection('posts').path(route.path).first()
    : Promise.resolve(null)
}, { watch: [() => route.path] })

const postTitle = computed(() => post.value?.title ?? props.title)
const coverImage = computed(() => isPost.value ? resolveContentImage(post.value?.meta?.image as string | undefined, route.path) : undefined)
const fromListing = useState('writing-from-listing', () => false)
const listingLeaving = useState('writing-listing-leaving', () => false)
const postLeaving = useState('writing-post-leaving', () => false)
const prefersReducedMotion = usePreferredReducedMotion()
const contentReady = ref(false)
const slideEnterReady = ref(false)
const coverHovered = ref(false)
const coverHoverArmed = ref(false)
const coverEnterPlayed = ref(false)
const titleFaded = computed(() => listingLeaving.value || isPost.value)

function revealArticle() {
  contentReady.value = true
  if (import.meta.server) {
    slideEnterReady.value = true
    return
  }

  nextTick(() => {
    applySlideEnterStaggerIn(document)
    slideEnterReady.value = true
  })
}

function onCoverEnter() {
  if (coverHoverArmed.value) coverHovered.value = true
}

function onCoverLeave() {
  coverHovered.value = false
  coverHoverArmed.value = true
}

function onCoverEnterAnimationEnd(event: AnimationEvent) {
  if (event.target === event.currentTarget) coverEnterPlayed.value = true
}

watch(isPost, (value, _oldValue, onCleanup) => {
  if (!value) {
    fromListing.value = false
    listingLeaving.value = false
    postLeaving.value = false
    contentReady.value = false
    slideEnterReady.value = false
    coverHovered.value = false
    coverHoverArmed.value = false
    coverEnterPlayed.value = false
    return
  }

  coverHovered.value = false
  coverHoverArmed.value = !fromListing.value
  coverEnterPlayed.value = false
  postLeaving.value = false
  slideEnterReady.value = false

  if (!fromListing.value || prefersReducedMotion.value === 'reduce') return revealArticle()
  contentReady.value = false
  const timer = window.setTimeout(revealArticle, 500)
  onCleanup(() => clearTimeout(timer))
}, { immediate: true })
</script>

<template>
  <Default :container="isPost">
    <template #left>
      <PostToc
        v-if="isPost"
        :links="post?.body?.toc?.links"
        :ready="contentReady && slideEnterReady"
        :leaving="postLeaving"
      />
    </template>

    <div
      v-if="coverImage"
      class="post-cover-fade absolute inset-x-0 top-0 z-0 h-64 overflow-hidden sm:h-80 md:h-96 motion-safe:transition-opacity motion-safe:duration-320 motion-safe:ease-linear"
      :class="postLeaving ? 'opacity-0' : fromListing && !coverEnterPlayed ? 'post-cover-enter' : 'opacity-100'"
      aria-hidden="true"
      @animationend="onCoverEnterAnimationEnd"
      @pointerenter="onCoverEnter"
      @pointerleave="onCoverLeave"
    >
      <img
        :src="coverImage"
        alt=""
        class="size-full object-cover object-center select-none will-change-[filter]"
        :class="coverHovered ? 'post-cover-clear' : undefined"
      >
    </div>
    <main class="relative z-1 flex flex-col items-center" :class="coverImage ? 'pointer-events-none' : ''">
      <div class="w-full flex flex-col mx-auto max-w-200">
        <header class="flex w-full items-end pt-30 px-3" :class="isPost ? 'mb-3' : ''">
          <div
            class="min-w-0 overflow-hidden prose dark:prose-invert max-w-none motion-safe:transition-opacity motion-safe:duration-320 motion-safe:ease-linear"
            :class="titleFaded ? 'opacity-0 pointer-events-none' : ''"
            :style="{ flexGrow: 1, flexBasis: '0px' }"
          >
            <h1 class="font-serif mb-0 lg:text-5xl!" :class="props.titleClass" :aria-hidden="titleFaded">{{ props.title }}</h1>
          </div>

          <div
            class="pointer-events-auto shrink-0 flex flex-col gap-3 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="isPost ? 'items-center' : 'items-end'"
          >
            <div class="flex items-end justify-end gap-1" :class="isPost ? '' : 'flex-col md:flex-row'">
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
                'prose dark:prose-invert prose-a:no-underline max-w-none writing-article',
                contentReady && slideEnterReady
                  ? 'slide-enter-content'
                  : contentReady
                    ? 'opacity-0'
                    : 'h-0 overflow-hidden opacity-0 pointer-events-none'
              ]
            : 'w-full'"
          :data-leaving="postLeaving || undefined"
        >
          <h1 v-if="isPost && contentReady" :key="route.path" class="pointer-events-none text-center">
            {{ postTitle }}
          </h1>
          <div class="pointer-events-auto">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </Default>
</template>

<style>
.post-cover-fade {
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

.post-cover-fade img {
  filter: blur(20px);
}

.post-cover-fade img.post-cover-clear {
  filter: blur(0);
}

@keyframes post-cover-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: no-preference) {
  .post-cover-fade img {
    transition: filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .post-cover-enter {
    animation: post-cover-fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  .post-cover-enter {
    opacity: 1;
  }
}

.writing-article a {
  text-decoration: none;
  text-decoration-line: none;
  text-decoration-color: transparent;
  text-decoration-thickness: 0;
  text-underline-offset: unset;
  border-bottom: 1px dashed color-mix(in oklch, currentColor 35%, transparent);
  border-radius: 0;
}

.writing-article a:hover {
  border-bottom: 1px solid currentColor;
}

.writing-article :is(h2, h3, h4, h5, h6) a,
.writing-article :is(h2, h3, h4, h5, h6) a:hover {
  text-decoration: none;
  border-bottom: none;
}

.writing-article :is(h2, h3, h4, h5, h6) {
  position: relative;
  scroll-margin-top: 2rem;
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

.writing-article :not(pre) > code {
  display: inline;
  font-family: inherit;
  font-size: 0.875em;
  line-height: inherit;
  vertical-align: 0.05em;
  border-radius: 0;
  padding: 0.085em 0.3em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  border: none;
  background-color: var(--ui-color-neutral-200);
  color: var(--ui-color-neutral-900);
  margin: 0 0.05em;
}

.dark .writing-article :not(pre) > code {
  background-color: var(--ui-color-neutral-800);
  color: var(--ui-color-neutral-100);
}

.writing-article code::after, .writing-article code::before {
  content: none;
}

.writing-article blockquote p::before, .writing-article blockquote p::after {
  content: none;
}

.writing-article blockquote p {
  font-style: normal;
  opacity: 0.6;
  font-weight: normal;
}
</style>
