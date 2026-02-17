import connectMongo from '../../../db/mongodb';
import Course from '../../../models/course';
import Student from '../../../models/student';
import Enrolment from '../../../models/enrolment';
import pool from '../../../db/mysql';
import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { courseCode } = body;

    if (!courseCode) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Course code is required'
        });
    };

    await connectMongo();

    const authUser = event.context.user;
    if (!authUser) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        });
    }

    const studentIdToEnrol = authUser.nanyangId || body.studentId;

    const course = await Course.findOne({ code: courseCode });

    if (!course) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Course not found'
        });
    };

    const student = await Student.findOne({ studentId: studentIdToEnrol });

    if (!student) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Student not found'
        });
    };

    // Verify authorized user
    if (authUser.role !== 'admin' && authUser.nanyangId !== student.studentId) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden: You can only enroll yourself.'
        });
    }

    const enrolment = await Enrolment.create({
        course: course._id,
        student: student._id
    });

    // Update student's enrolment list
    await Student.findByIdAndUpdate(student._id, {
        $push: { enrolmentThisSemester: enrolment._id }
    });

    await pool.execute(
        `INSERT INTO enrolment (std_id, cos_code, enrol_time, enrol_status, enrol_sem, enrol_year) 
         VALUES (?, ?, ?, 'Pending', 2026, 1)`,
        [student.studentId, courseCode, enrolment.enrolledAt]
    );

    return {
        success: true,
        message: `Successfully enrolled in ${courseCode}`
    };
});
