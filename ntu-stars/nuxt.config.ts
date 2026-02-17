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
    srcDir: 'app/',
    // serverDir: 'ntu-services/',
    routeRules: {
        '/': { prerender: true },
        '/api/**': { cors: true, proxy: 'http://localhost:3000/api/**' }
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
