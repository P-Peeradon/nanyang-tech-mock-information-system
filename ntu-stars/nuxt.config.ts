// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        '../ntu-services'
    ],
    modules: [
        '@nuxt/ui',
        '@pinia/nuxt'
    ],
    devtools: {
        enabled: true
    },
    css: ['~/assets/css/main.css'],
    srcDir: 'ntu-stars/',
    serverDir: 'ntu-services/',
    routeRules: {
        '/': { prerender: true }
    },

    devServer: {
        port: 4520
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
