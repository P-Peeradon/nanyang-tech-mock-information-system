import courseRest from "~/server/resource/courseRest";

export default defineEventHandler(async (e) => {
    return courseRest.retrieveCourse();
});