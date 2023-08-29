// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    assetsInclude: ['**/*.JPG']
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss'
  ],
  googleFonts: {
    families: {
      Roboto: [400, 500, 700]
    }
  },
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
})
