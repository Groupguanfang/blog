<script setup lang="ts">
const colorMode = useColorMode()
const { locale, locales, setLocale, t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const localeOptions = computed(() =>
  locales.value.map(item => typeof item === 'string'
    ? { code: item, name: item }
    : { code: item.code, name: item.name ?? item.code }
  )
)

const nextLocale = computed(() => {
  const options = localeOptions.value
  const currentIndex = options.findIndex(item => item.code === locale.value)
  return options[(currentIndex + 1) % options.length] ?? options[0]
})

const toggleLocale = () => {
  if (nextLocale.value) {
    setLocale(nextLocale.value.code)
  }
}
</script>

<template>
  <UFieldGroup>
    <UButton
      variant="outline"
      color="neutral"
      icon="ph:translate-duotone"
      class="rounded-none cursor-pointer"
      :ui="{ leadingIcon: 'opacity-80' }"
      size="sm"
      :aria-label="t('operation.language')"
      :title="nextLocale?.name"
      @click="toggleLocale"
    />
    <UButton
      variant="outline"
      color="neutral"
      :icon="isDark ? 'ph:sun-duotone' : 'ph:moon-duotone'"
      class="rounded-none cursor-pointer"
      :ui="{ leadingIcon: 'opacity-80' }"
      size="sm"
      :aria-label="t('operation.colorMode')"
      @click="toggleColorMode"
    />
  </UFieldGroup>
</template>
