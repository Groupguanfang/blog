const assetImages = import.meta.glob<string>('~/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif}', {
  query: '?url',
  import: 'default',
  eager: true
})

const contentImages = import.meta.glob<string>('../../content/**/*.{jpg,jpeg,png,webp,avif,gif}', {
  query: '?url',
  import: 'default',
  eager: true
})

const images = { ...assetImages, ...contentImages }

function isRemote(image: string) {
  return /^(https?:)?\/\//i.test(image) || image.startsWith('data:') || image.startsWith('blob:')
}

function isRelative(image: string) {
  return image.startsWith('./') || image.startsWith('../')
}

function normalizeKey(key: string) {
  return key.replace(/\\/g, '/').replace(/\?.*$/, '')
}

function findImage(normalized: string) {
  return Object.entries(images).find(([key]) => {
    const keyPath = normalizeKey(key)
    return keyPath.endsWith(`/${normalized}`) || keyPath.endsWith(normalized)
  })?.[1]
}

function resolveRelative(image: string, from?: string) {
  if (!from) return image.replace(/^\.\//, '')

  const document = from.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.md$/i, '')
  const directory = document.includes('/') ? document.slice(0, document.lastIndexOf('/') + 1) : ''
  const resolved = new URL(image, `file:///${directory}`)

  return decodeURIComponent(resolved.pathname).replace(/^\/+/, '')
}

export function resolveContentImage(image?: string, from?: string) {
  if (!image) return undefined
  if (isRemote(image)) return image

  if (isRelative(image)) {
    const resolved = resolveRelative(image, from)
    return findImage(resolved) ?? findImage(image.replace(/^\.\//, ''))
  }

  const normalized = image
    .replace(/\\/g, '/')
    .replace(/^(~\/|@\/)/, '')
    .replace(/^\/+/, '')

  return findImage(normalized)
}
