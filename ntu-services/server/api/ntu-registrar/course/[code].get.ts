import courseRest from '../../../resource/courseRest';

export default defineEventHandler(async (e) => {

    const query = getQuery<{ fields?: string }>(e);
    const fields: string[] | undefined = query?.fields?.split(',');
    const code: string | undefined = getRouterParam(e, 'code');

    if (!code) {
        throw createError({
            statusCode: 400,
            statusMessage: '400 Bad Request: please include the course code'
        })
    }

    const course = courseRest.retrieveCourse({option: fields, code: code}); 
    if (!course) {
        throw createError({
            statusCode: 404,
            statusMessage: `404 Not Found: Course with code ${code} does not exist.`
        });
    }

    return course;
});