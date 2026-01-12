import studentRest from "~/server/resource/studentRest";

export default defineEventHandler(async (e) => {
    const id: string | undefined = getRouterParam(e, 'id');

    const student = await studentRest.retrieveStudent(id);

    if (!student) {
        throw createError({
            statusCode: 404,
            statusMessage: `Student with ID: ${id} not found`
        });
    }

    setResponseStatus(e, 200); 
    return student;
})