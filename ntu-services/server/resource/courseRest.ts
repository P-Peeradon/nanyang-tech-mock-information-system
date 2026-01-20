import pool from '../../db/mysql';
import type { RowDataPacket } from 'mysql2';

async function createCourse() {
    
};

async function retrieveCourse(code?: string) {
    let query: string = 'SELECT * FROM course';

    if (code) {
        query += ' WHERE cos_code = ?';
        const [rows, _field] = await pool.execute<RowDataPacket[]>(query, [code]);
        return rows[0];
    } else {
        const [rows] = await pool.execute<RowDataPacket[]>(query)
        return rows;
    }  
};

function updateCourse() {
    
};

function deleteCourse() {
    
};

export default { createCourse, retrieveCourse, updateCourse, deleteCourse };