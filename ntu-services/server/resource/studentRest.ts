import pool from '../../db/mysql';
import { RowDataPacket } from 'mysql2';

function createStudent() {
    
};

async function retrieveStudent(id?: string) {
    let query: string = 'SELECT * FROM student';

    if (id) {
        query += ' WHERE std_id = ?';
        const [rows, _field] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows[0];
    } else {
        const [rows] = await pool.execute(query)
        return rows;
    }  
};

function updateStudent() {
    
};

function deleteStudent() {
    
};

export default { createStudent, retrieveStudent, updateStudent, deleteStudent };