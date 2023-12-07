// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
],
image: {
  dir: 'assets/img'
},
  devtools: { enabled: true },
  build: {
    transpile: ['@fortawesome/vue-fontawesome']
},
  css: [
  "~/assets/main.css",
  '@fortawesome/fontawesome-svg-core/styles.css',
],
ssr: false,
})
