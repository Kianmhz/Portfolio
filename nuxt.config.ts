// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
],
image: {
  dir: 'assets/img',
  format: ['webp'],
},
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
})
