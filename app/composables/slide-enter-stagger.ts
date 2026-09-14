const SCROLL_FLUSH_PX = 40

export function useSlideEnterStagger(root: MaybeRefOrGetter<HTMLElement | null | undefined>) {
  const originY = ref(0)
  const flushed = ref(false)

  function apply() {
    applySlideEnterStaggerIn(toValue(root))
  }

  function flush() {
    if (flushed.value) return
    flushed.value = true
    skipPendingSlideEnter(toValue(root) ?? document)
  }

  onMounted(() => {
    originY.value = window.scrollY
    apply()
  })

  watch(() => toValue(root), () => {
    flushed.value = false
    originY.value = window.scrollY
    nextTick(apply)
  })

  useMutationObserver(root, apply, { childList: true, subtree: true })

  useEventListener(window, 'scroll', () => {
    if (Math.abs(window.scrollY - originY.value) < SCROLL_FLUSH_PX) return
    flush()
  }, { passive: true })
}
