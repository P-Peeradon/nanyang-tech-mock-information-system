import mysql, { type Pool } from 'mysql2/promise';

let pool: Pool;

export const getPool = (): Pool => {
      if (!pool) {
            const config = useRuntimeConfig();
            pool = mysql.createPool({
                  host: config.mysqlHost || 'localhost',
                  user: config.mysqlUser || 'nanyang60',
                  password: config.mysqlPassword || 'NTUSingapore+60',
                  database: config.mysqlDBName || 'nanyang_stars',
                  waitForConnections: true,
                  connectionLimit: 20,
            });
      }
      return pool;
};

export default {
      execute: async <T>(sql: string, params?: any[]): Promise<[T, any]> => {
            const p = getPool();
            return p.execute<any>(sql, params) as Promise<[T, any]>;
      }
};