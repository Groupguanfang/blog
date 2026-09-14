<script setup lang="ts">
export interface PostTocLink {
  id: string
  text: string
  depth?: number
  children?: PostTocLink[]
}

const props = withDefaults(defineProps<{
  links?: PostTocLink[]
  ready?: boolean
  leaving?: boolean
}>(), {
  links: () => [],
  ready: true,
  leaving: false
})

const { t } = useI18n()
const prefersReducedMotion = usePreferredReducedMotion()
const activeId = ref('')

const tocLinks = computed(() => props.links ?? [])
const visible = computed(() => props.ready && !props.leaving && tocLinks.value.length > 0)

const items = computed(() => {
  const flattened: { id: string, text: string, depth: number }[] = []

  function walk(links: PostTocLink[], depth: number) {
    for (const link of links) {
      flattened.push({ id: link.id, text: link.text, depth })
      if (link.children?.length) walk(link.children, depth + 1)
    }
  }

  walk(tocLinks.value, 0)
  return flattened
})

function updateActive() {
  if (!import.meta.client || !visible.value) return

  const headings = items.value
    .map(item => ({ id: item.id, el: document.getElementById(item.id) }))
    .filter((item): item is { id: string, el: HTMLElement } => !!item.el)

  if (!headings.length) return

  const offset = 200
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
  let current = headings[0]!.id

  for (const heading of headings) {
    if (heading.el.getBoundingClientRect().top <= offset) current = heading.id
  }

  if (atBottom) current = headings.at(-1)!.id
  activeId.value = current
}

function tickWidth(depth: number, active: boolean) {
  const base = Math.max(0.35, 0.75 - depth * 0.28)
  return `${active ? base + 0.2 : base}rem`
}

function onNavigate(event: MouseEvent, id: string) {
  const heading = document.getElementById(id)
  if (!heading) return

  event.preventDefault()
  const top = heading.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion.value === 'reduce' ? 'auto' : 'smooth'
  })
  history.replaceState(history.state, '', `#${encodeURIComponent(id)}`)
  activeId.value = id
}

watch(() => [props.links, props.ready, props.leaving], () => {
  nextTick(updateActive)
})

onMounted(updateActive)
useEventListener(window, 'scroll', updateActive, { passive: true })
</script>

<template>
  <nav
    v-if="tocLinks.length"
    class="text-right motion-safe:transition-opacity motion-safe:duration-320 motion-safe:ease-linear"
    :class="visible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    :aria-label="t('post.toc')"
  >
    <p class="mb-3 pr-4 text-xs font-light tracking-wide opacity-40">{{ t('post.toc') }}</p>
    <ul class="flex flex-col gap-1 text-[13px] font-light leading-snug">
      <li v-for="item in items" :key="item.id" class="group relative">
        <a
          :href="`#${item.id}`"
          class="block py-0.5 motion-safe:transition-opacity motion-safe:duration-200"
          :class="activeId === item.id ? 'opacity-100' : 'opacity-40 hover:opacity-80'"
          :style="{ paddingRight: `${1 + item.depth * 0.55}rem` }"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click="onNavigate($event, item.id)"
        >
          {{ item.text }}
        </a>
        <span
          aria-hidden="true"
          class="pointer-events-none absolute right-0 top-[0.8em] origin-right border-t border-dashed motion-safe:transition-[width,border-color,opacity] motion-safe:duration-200"
          :class="activeId === item.id ? 'border-current opacity-80' : 'border-neutral-300 dark:border-neutral-700 group-hover:border-current group-hover:opacity-50'"
          :style="{ width: tickWidth(item.depth, activeId === item.id) }"
        />
      </li>
    </ul>
  </nav>
</template>
