// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxthub/core', 'nuxt-mcp', '@nuxt/ui'],

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      auth: {
        redirectUserTo: '/user',
        redirectGuestTo: '/',
      },
    },
  },

  css: ['~/assets/css/index.css'],

  future: { compatibilityVersion: 4 },

  compatibilityDate: '2025-05-13',

  hub: {
    database: true,
    kv: true,
    workers: true,
    bindings: {
      observability: {
        logs: true,
      },
    },
  }
})
