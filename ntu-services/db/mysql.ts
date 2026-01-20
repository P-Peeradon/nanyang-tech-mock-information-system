import mysql, { type Pool } from 'mysql2/promise';

const config = useRuntimeConfig();

const pool: Pool = mysql.createPool({
      host: config.mysqlHost || 'localhost',
      user: config.mysqlUser || 'nanyang60',
      password: config.mysqlPassword || 'NTUSingapore+60',
      database: config.mysqlDBName || 'nanyang_stars',
      waitForConnections: true,
      connectionLimit: 20,
});

export default pool;