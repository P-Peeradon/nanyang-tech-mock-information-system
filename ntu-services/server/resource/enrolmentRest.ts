import pool from '../../db/mysql';

export interface EnrolmentParams {
    studentId: string;
    courseCode: string;
    enrolledAt: Date;
    status?: string;
    semester?: number;
    year?: number;
}

async function createEnrolment({
    studentId,
    courseCode,
    enrolledAt,
    status = 'Pending',
    semester = 1,
    year = 2026
}: EnrolmentParams) {
    const query = `
        INSERT INTO enrolment (std_id, cos_code, enrol_time, enrol_status, enrol_sem, enrol_year) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [studentId, courseCode, enrolledAt, status, semester, year]);
    return result;
}

export default { createEnrolment };
