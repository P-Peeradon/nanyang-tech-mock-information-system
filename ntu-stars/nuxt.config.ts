// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        '../ntu-services'
    ],

    devtools: {
        enabled: true
    },

    css: ['~/assets/css/main.css'],

    routeRules: {
        '/': { prerender: true }
    },

    compatibilityDate: '2025-01-15',

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs',
                semi: true,
                indent: 4,
                quotes: 'single'
            }
        }
    }
});
