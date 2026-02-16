
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { courseCode } = body;

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!courseCode) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Course code is required'
        });
    }

    // Mock success (In real app, check DB, clashes, vacancies)
    return {
        success: true,
        message: `Successfully enrolled in ${courseCode}`
    };
});
