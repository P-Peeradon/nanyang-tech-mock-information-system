import courseRest from '../../resource/courseRest';

export default defineEventHandler(async (e) => {
    return courseRest.retrieveCourse();
});