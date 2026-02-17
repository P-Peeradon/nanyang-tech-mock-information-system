import courseRest from '../../resource/courseRest';

export default defineEventHandler(async (e) => {
    console.log('GET /api/ntu-registrar/course called');
    const query = getQuery<{ fields?: string }>(e);
    const fields: string[] | undefined = query?.fields?.split(',');

    return courseRest.retrieveCourse({ option: fields });
});
