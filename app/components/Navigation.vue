<script setup lang="ts">
const menus = [
  { name: '首页', icon: 'ph:house-duotone', hoverIcon: 'ph:house-fill', href: '/' },
  { name: '文字', icon: 'ph:text-t-duotone', hoverIcon: 'ph:text-t-fill', href: '/posts' },
  { name: '构建', icon: 'ph:building-duotone', hoverIcon: 'ph:building-fill', href: '/builds' },
] as const;

const CHAR_MS = 90;
const ITEM_GAP_MS = 140;
const START_MS = 220;

const prefersReducedMotion = usePreferredReducedMotion();
const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
const steps = ref(menus.map(() => 0));
const caretAt = ref(-1);

let runId = 0;
let cancelled = false;

function wait(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

function itemTotal(index: number) {
  const menu = menus[index];
  return menu ? 1 + menu.name.length : 0;
}

function revealAll() {
  steps.value = menus.map((_, index) => itemTotal(index));
  caretAt.value = -1;
}

function isIconShown(index: number) {
  return (steps.value[index] ?? 0) >= 1;
}

function typedName(index: number) {
  const menu = menus[index];
  if (!menu) return '';
  return menu.name.slice(0, Math.max(0, (steps.value[index] ?? 0) - 1));
}

async function typeItem(index: number, id: number, keepCaret = false) {
  const total = itemTotal(index);
  if (!total) return;

  caretAt.value = index;
  steps.value[index] = 0;

  for (let step = 1; step <= total; step++) {
    if (cancelled || id !== runId) return;
    steps.value[index] = step;
    await wait(CHAR_MS);
  }

  if (cancelled || id !== runId) return;
  if (!keepCaret && caretAt.value === index) caretAt.value = -1;
}

async function typeAll() {
  const id = ++runId;

  if (prefersReducedMotion.value === 'reduce') {
    revealAll();
    return;
  }

  steps.value = menus.map(() => 0);
  await wait(START_MS);

  for (let index = 0; index < menus.length; index++) {
    if (cancelled || id !== runId) return;
    await typeItem(index, id);
    if (cancelled || id !== runId) return;
    await wait(ITEM_GAP_MS);
  }
}

function onEnter(index: number) {
  if (prefersReducedMotion.value === 'reduce' || !canHover.value) return;
  typeItem(index, ++runId, true);
}

function onLeave() {
  if (prefersReducedMotion.value === 'reduce' || !canHover.value) return;
  runId++;
  revealAll();
}

onMounted(typeAll);

onUnmounted(() => {
  cancelled = true;
  runId++;
});
</script>

<template>
  <nav class="not-prose">
    <ul class="flex gap-5 justify-center items-center font-light text-sm opacity-80">
      <li v-for="(menu, index) in menus" :key="menu.href">
        <NuxtLink
          :to="menu.href"
          class="group"
          :aria-label="menu.name"
          @mouseenter="onEnter(index)"
          @mouseleave="onLeave"
          @focus="onEnter(index)"
          @blur="onLeave"
        >
          <span class="relative inline-flex items-center">
            <span class="invisible inline-flex items-center gap-1" aria-hidden="true">
              <Icon :name="menu.icon" />
              <span>{{ menu.name }}</span>
            </span>
            <span class="absolute inset-0 inline-flex items-center" aria-hidden="true">
              <span v-if="isIconShown(index)" class="relative inline-flex mr-1">
                <Icon :name="menu.icon" class="transition-opacity group-hover:opacity-0" />
                <Icon :name="menu.hoverIcon" class="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span class="whitespace-nowrap">{{ typedName(index) }}</span>
              <span v-if="caretAt === index" class="type-caret" />
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.type-caret {
  display: inline-block;
  width: 1px;
  height: 0.85em;
  margin-left: 1px;
  background: currentColor;
  vertical-align: -0.06em;
}

@media (prefers-reduced-motion: no-preference) {
  .type-caret {
    animation: caret-blink 0.8s steps(1, end) infinite;
  }
}

@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}
</style>
