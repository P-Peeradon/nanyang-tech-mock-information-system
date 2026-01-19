import pool from '../../db/database';
import { RowDataPacket } from 'mysql2';

function createOffer() {
    
};

async function retrieveOffer(code?: string, section?: number) {
    let query: string = 'SELECT * FROM offer';

    if (code && section) {
        query += ' WHERE code = ? AND offer = ?';
        const [rows, _field] = await pool.execute<RowDataPacket[]>(query, [code, section]);
        return rows[0];
    } else if (code) {
        query += 'WHERE code = ?';
        const [rows, _field] = await pool.execute<RowDataPacket[]>(query, [code, section]);
        return rows;
    } else {
        const [rows] = await pool.execute(query)
        return rows;
    }  
};

function updateOffer() {
    
};

function deleteOffer() {
    
};

export default { createOffer, retrieveOffer, updateOffer, deleteOffer };