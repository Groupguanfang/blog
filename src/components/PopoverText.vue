<script setup lang="tsx">
defineOptions({
  inheritAttrs: false,
})
defineProps({
  title: {
    type: String,
  },
  buttonStyle: {
    type: String,
  },
})

const buttonRef = ref<HTMLElement | null>(null)
const { width: buttonWidth } = useElementSize(buttonRef)
const { title: titleSlot } = useSlots()
</script>

<template>
  <Popover relative as="span">
    <PopoverButton
      ref="buttonRef"
      :class="`${buttonStyle} underline`" underline="wavy yellow" relative top--0.1 mx1 outline-none transition-all hover-op-80
    >
      <slot v-if="titleSlot" name="title" />
      <div v-else>
        {{ title }}
      </div>
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        v-bind="$attrs"
        absolute left-0 top--10 z-99 rounded-md bg-white px3 py1.5 dark:bg-gray-800 border="1 solid" dark:border="none"
        as="span"
        :style="{ left: `-${buttonWidth / 2}px` }"
      >
        <slot />
      </PopoverPanel>
    </transition>
  </Popover>
</template>
