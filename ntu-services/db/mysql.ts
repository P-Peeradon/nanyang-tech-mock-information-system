import mysql, { type Pool } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_NAME || 'ntu_db',
      waitForConnections: true,
      connectionLimit: 20,
});

export default pool;