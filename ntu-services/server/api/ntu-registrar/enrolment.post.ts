import connectMongo from '../../../db/mongodb';
import Course from '../../../models/course';
import Student from '../../../models/student';
import Enrolment from '../../../models/enrolment';
import enrolmentRest from '../../resource/enrolmentRest';
import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { courseCode } = body;

    if (!courseCode) {
        throw createError({
            statusCode: 400,
            statusMessage: '400 Bad Request: Course code is required'
        });
    };

    await connectMongo();

    const authUser = event.context.user;
    if (!authUser) {
        throw createError({
            statusCode: 401,
            statusMessage: '401 Unauthorized: You cannot use the api.'
        });
    }

    const studentIdToEnrol = authUser.nanyangId || body.studentId;

    const course = await Course.findOne({ code: courseCode });

    if (!course) {
        throw createError({
            statusCode: 404,
            statusMessage: `404 Not Found: Course ${courseCode} not found.`
        });
    };

    const student = await Student.findOne({ studentId: studentIdToEnrol });

    if (!student) {
        throw createError({
            statusCode: 404,
            statusMessage: `404 Not Found: Student ${studentIdToEnrol} not found.`
        });
    };

    // Verify authorized user
    if (authUser.role !== 'admin' && authUser.nanyangId !== student.studentId) {
        throw createError({
            statusCode: 403,
            statusMessage: '403 Forbidden: You can only enroll yourself.'
        });
    };

    const enrolment = await Enrolment.create({
        course: course._id,
        student: student._id
    });

    // Update student's enrolment list
    await Student.findByIdAndUpdate(student._id, {
        $push: { enrolmentThisSemester: enrolment._id }
    });

    await enrolmentRest.createEnrolment({
        studentId: student.studentId,
        courseCode: courseCode,
        enrolledAt: enrolment.enrolledAt
    });

    setResponseStatus(event, 201);

    return {
        success: true,
        message: `Successfully enrolled in ${courseCode}`
    };
});
