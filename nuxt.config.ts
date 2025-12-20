// https://nuxt.com/docs/api/configuration/nuxt-config
// deploying
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  hub: {
    db: {
      dialect: "sqlite",
    },
  },
  $production: {
    hub: {
      driver: "d1-http",
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Mulish: [200, 400, 700],
    },
  },
  ui: {
    colorMode: false,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [{ rel: "icon", href: "/favicon.ico?v=2" }],
    },
  },
});
