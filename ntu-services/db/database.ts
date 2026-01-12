import mysql, { type Pool } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ntu_db',
      waitForConnections: true,
      connectionLimit: 10,
});

export default pool;