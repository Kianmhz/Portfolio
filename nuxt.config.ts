// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    assetsInclude: ['**/*.JPG']
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
})
