import mysql, { type Pool } from 'mysql2/promise';

const config = useRuntimeConfig();

const pool: Pool = mysql.createPool({
      host: config.mysqlHost || 'localhost',
      user: config.mysqlUser || 'nanyang60',
      password: config.mysqlPassword || '',
      database: config.mysqlDBName || 'ntu_db',
      waitForConnections: true,
      connectionLimit: 20,
});

export default pool;