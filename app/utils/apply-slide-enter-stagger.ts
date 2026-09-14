const TITLE_STAGGER = 1

function isLaidOut(element: HTMLElement) {
  return element.getBoundingClientRect().height > 0
}

function nextStagger(root: ParentNode, start: number) {
  let next = start

  for (const child of root.children) {
    if (!(child instanceof HTMLElement)) continue
    const current = Number(child.style.getPropertyValue('--stagger'))
    if (Number.isFinite(current) && current >= next)
      next = current + 1
  }

  return next
}

export function applySlideEnterStagger(root: ParentNode | null | undefined, start = TITLE_STAGGER + 1) {
  if (!root || typeof window === 'undefined') return

  const viewportBottom = window.innerHeight
  let stagger = nextStagger(root, start)

  for (const child of root.children) {
    if (!(child instanceof HTMLElement)) continue
    if (child.hasAttribute('data-slide-enter-skip') || child.style.getPropertyValue('--stagger'))
      continue

    const top = child.getBoundingClientRect().top
    if (top >= viewportBottom) {
      child.setAttribute('data-slide-enter-skip', '')
      continue
    }

    if (!isLaidOut(child))
      continue

    child.style.setProperty('--stagger', String(stagger++))
  }
}

export function applySlideEnterStaggerIn(scope: ParentNode | null | undefined, start = TITLE_STAGGER + 1) {
  scope?.querySelectorAll('.slide-enter-blocks').forEach(el => applySlideEnterStagger(el, start))
}

export function skipPendingSlideEnter(scope: ParentNode | null | undefined = document) {
  scope?.querySelectorAll('.slide-enter-blocks > *:not([data-slide-enter-skip])').forEach((el) => {
    if (!(el instanceof HTMLElement)) return
    el.setAttribute('data-slide-enter-skip', '')
    el.style.removeProperty('--stagger')
  })
}
