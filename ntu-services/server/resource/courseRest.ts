import pool from '../../db/mysql';
import type { RowDataPacket } from 'mysql2';

export interface coursePacket extends RowDataPacket {
    cos_code: string,
    cos_title: string,
    cos_au: number
};

const ALLOWED_COURSE_FIELDS = ['cos_code', 'cos_title', 'cos_au', 'cos_description'];

async function createCourse() {

};

async function retrieveCourse({ option, code }: { option?: string[], code?: string } = {}): Promise<coursePacket | coursePacket[]> {
    try {
        let fieldsToSelect = '*';

        if (option && option.length > 0) {
            // Filter the user-provided fields against our whitelist
            const validFields = option.filter(field => ALLOWED_COURSE_FIELDS.includes(field));

            // If any valid fields remain after filtering, use them.
            // Otherwise, stick with the default '*'.
            if (validFields.length > 0) {
                // Join the *validated* fields into a comma-separated string
                fieldsToSelect = validFields.join(', ');
            }
        }

        let query: string = `SELECT ${fieldsToSelect} FROM course`;
        const params: (string | number)[] = [];

        if (code) {
            query += ' WHERE cos_code = ?';
            params.push(code);
            const [rows, _field] = await pool.execute<coursePacket[]>(query, [code]);
            return rows[0];
        } else {
            const [rows, _field] = await pool.execute<coursePacket[]>(query);
            return rows;
        }

    } catch (err) {

        console.error(err)
        throw err;

    }
};

function updateCourse() {

};

function deleteCourse() {

};

export default { createCourse, retrieveCourse, updateCourse, deleteCourse };