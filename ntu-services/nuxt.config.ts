// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxt/eslint'],
    typescript: { strict: true, hoist: ['@ntu/shared'] },
    runtimeConfig: {
        jwtSecret: process.env.NUXT_JWT_SECRET,
        mysqlHost: process.env.NUXT_MYSQL_HOST,
        mysqlUser: process.env.NUXT_MYSQL_USER,
        mysqlPassword: process.env.NUXT_MYSQL_PASSWORD,
        mysqlDBName: process.env.NUXT_MYSQL_NAME,
        mongodbURI: process.env.NUXT_MONGODB_URI
    },
    ssr: true,
    nitro: {
        scanDirs: ['server'],
        routeRules: {
            // Enable CORS so ntu-stars can contact these microservices
            '/api/**': { 
                cors: true, 
                headers: { 'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS' } 
            }
        },
    }
});
