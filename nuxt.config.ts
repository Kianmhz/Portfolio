// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    assetsInclude: ['**/*.JPG']
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  build: {
    transpile: [
        '@fortawesome/vue-fontawesome'
    ]
},
  css: [
  "~/assets/main.css",
  '@fortawesome/fontawesome-svg-core/styles.css',
],
ssr: false,
})
