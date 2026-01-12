import courseRest from "~/server/resource/courseRest"

export default defineEventHandler(async (e) => {
    const code: string | undefined = getRouterParam(e, 'code');

    const course = courseRest.retrieveCourse(code); 
    if (!course) {
        throw createError({
            statusCode: 404,
            statusMessage: `Course with code: ${code} not found`
        });
    }

    return course;
});