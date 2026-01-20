import courseRest from '../../resource/courseRest';

export default defineEventHandler(async (e) => {
    const query = getQuery<{ fields?: string }>(e);
    const fields: string[] | undefined = query?.fields?.split(',');

    return courseRest.retrieveCourse(fields);
});