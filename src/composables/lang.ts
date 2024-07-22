import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

export function useNextLanguage() {
  const { locale } = useI18n()

  return {
    changeLanguage() {
      loadLanguageAsync(availableLocales.find(lang => lang !== locale.value)!)
    },
  }
}
