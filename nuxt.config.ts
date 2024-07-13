// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/ui", 'nuxt-swiper', "nuxt-aos"],
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: "Kianmhz - Personal Website",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Kianmehr Haddad Zahmatkesh Personal portfolio Website",
        },
      ],
      link: [{ rel: "icon", href: "/logoV2.webp" }],
    },
  },

  compatibilityDate: "2024-07-10",
});