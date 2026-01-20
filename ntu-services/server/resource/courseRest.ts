import pool from '../../db/mysql';
import type { RowDataPacket } from 'mysql2';

export interface coursePacket extends RowDataPacket {
    cos_code: string,
    cos_title: string,
    cos_au: number
}

async function createCourse() {
    
};

async function retrieveCourse(option?: string[], code?: string): Promise<coursePacket | coursePacket[]> {
    const fields: string = option?.join(',') ?? '*';

    let query: string = 'SELECT ? FROM course';

    if (code) {
        query += ' WHERE cos_code = ?';
        const [rows, _field] = await pool.execute<coursePacket[]>(query, [fields, code]);
        return rows[0];
    } else {
        const [rows] = await pool.execute<coursePacket[]>(query, [fields])
        return rows;
    }  
};

function updateCourse() {
    
};

function deleteCourse() {
    
};

export default { createCourse, retrieveCourse, updateCourse, deleteCourse };