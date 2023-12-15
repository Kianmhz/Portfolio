// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],
  devtools: { enabled: true },
  build: {
    transpile: ['@fortawesome/vue-fontawesome']
  },
  css: [
    "~/assets/main.css",
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  googleFonts: {
    families: {
      Roboto: {
        wght: [400, 500, 700]
      },
      'Lato': {
        wght: [400, 700, 900]
      },
      'League Spartan': true,
      'Montserrat': true,
      'Open Sans': true
    }
  },
  ssr: false,
  app: {
    head: {
      title: 'Kianmhz - Personal Website',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', href: '/logo.png' }
      ],
    }
  }
})
