// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxt/eslint'],
    typescript: { strict: true, hoist: ['@ntu/shared'] },
    runtimeConfig: {
        jwtSecret: process.env.JWT_SECRET,
        mysqlHost: process.env.MYSQL_HOST,
        mysqlUser: process.env.MYSQL_USER,
        mysqlPassword: process.env.MYSQL_PASSWORD,
        mysqlDBName: process.env.MYSQL_NAME,
        mongodbURI: process.env.MONGODB_URI
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
