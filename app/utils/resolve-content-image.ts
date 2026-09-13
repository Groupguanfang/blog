const assetImages = import.meta.glob<string>('~/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif}', {
  query: '?url',
  import: 'default',
  eager: true
})

export function resolveContentImage(image?: string) {
  if (!image) return undefined
  if (/^(https?:)?\/\//i.test(image) || image.startsWith('data:') || image.startsWith('blob:')) {
    return image
  }

  const normalized = image
    .replace(/\\/g, '/')
    .replace(/^(~\/|@\/)/, '')
    .replace(/^\/+/, '')

  const match = Object.entries(assetImages).find(([key]) => {
    const keyPath = key.replace(/\\/g, '/')
    return keyPath.endsWith(`/${normalized}`) || keyPath.endsWith(normalized)
  })

  return match?.[1]
}
