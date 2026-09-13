export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],

  colorMode: {
    classSuffix: '',
    disableTransition: true
  },

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { 
        name: 'Noto Serif SC',
        provider: 'google',
        weights: [400, 500, 600, 700]
      }
    ]
  },

  i18n: {
    locales: [
      { code: 'zh-CN', name: '简体中文', language: 'zh-CN', file: 'zh-CN.json' },
      { code: 'en', name: 'English', language: 'en', file: 'en.json' },
    ],
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
  },

  appConfig: {
    ui: {
      colors: {
        primary: 'red',
        neutral: 'zinc'
      },
      icons: {
        arrowDown: 'i-ph-arrow-down-duotone',
        arrowLeft: 'i-ph-arrow-left-duotone',
        arrowRight: 'i-ph-arrow-right-duotone',
        arrowUp: 'i-ph-arrow-up-duotone',
        caution: 'i-ph-warning-circle-duotone',
        check: 'i-ph-check-circle-duotone',
        chevronDoubleLeft: 'i-ph-caret-double-left-duotone',
        chevronDoubleRight: 'i-ph-caret-double-right-duotone',
        chevronDown: 'i-ph-caret-down-duotone',
        chevronLeft: 'i-ph-caret-left-duotone',
        chevronRight: 'i-ph-caret-right',
        chevronUp: 'i-ph-caret-up-duotone',
        close: 'i-ph-x',
        copy: 'i-ph-copy-duotone',
        copyCheck: 'i-ph-check-circle-duotone',
        dark: 'i-ph-moon-duotone',
        drag: 'i-ph-dots-six-vertical-duotone',
        ellipsis: 'i-ph-dots-three-duotone',
        error: 'i-ph-x-circle-duotone',
        external: 'i-ph-arrow-up-right',
        eye: 'i-ph-eye-duotone',
        eyeOff: 'i-ph-eye-slash-duotone',
        file: 'i-ph-file-duotone',
        folder: 'i-ph-folder-duotone',
        folderOpen: 'i-ph-folder-open-duotone',
        hash: 'i-ph-hash-duotone',
        info: 'i-ph-info-duotone',
        light: 'i-ph-sun-duotone',
        loading: 'i-ph-circle-notch-duotone',
        menu: 'i-ph-list-duotone',
        minus: 'i-ph-minus-duotone',
        panelClose: 'i-ph-caret-left-duotone',
        panelOpen: 'i-ph-caret-right-duotone',
        plus: 'i-ph-plus-duotone',
        reload: 'i-ph-arrow-counter-clockwise-duotone',
        search: 'i-ph-magnifying-glass-duotone',
        stop: 'i-ph-square-duotone',
        star: 'i-ph-star-duotone',
        success: 'i-ph-check-circle-duotone',
        system: 'i-ph-monitor-duotone',
        tip: 'i-ph-lightbulb-duotone',
        upload: 'i-ph-upload-duotone',
        warning: 'i-ph-warning-duotone'
      }
    }
  }
})