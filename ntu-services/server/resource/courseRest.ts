import pool from '../../db/mysql';
import { RowDataPacket } from 'mysql2';

function createCourse() {
    
};

async function retrieveCourse(code?: string) {
    let query: string = 'SELECT * FROM course';

    if (code) {
        query += ' WHERE cos_code = ?';
        const [rows, _field] = await pool.execute<RowDataPacket[]>(query, [code]);
        return rows[0];
    } else {
        const [rows] = await pool.execute(query)
        return rows;
    }  
};

function updateCourse() {
    
};

function deleteCourse() {
    
};

export default { createCourse, retrieveCourse, updateCourse, deleteCourse };