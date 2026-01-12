export default defineEventHandler((e) => {
    throw createError({
        statusCode: 405,
        statusMessage: 'Method not allow: get all student entities.'
    })
})