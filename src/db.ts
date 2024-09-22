import { Pool, QueryResult } from 'pg'

const PG_USER = process.env.PG_USER ?? '';
const PG_HOST = process.env.PG_HOST ?? 'localhost';
const PG_DATABASE = process.env.PG_DATABASE ?? '';
const PG_PASSWORD = process.env.PG_PASSWORD ?? '';
const PG_PORT = process.env.PG_PORT ?? '5432';

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: parseInt(PG_PORT)
})

export const asyncQuery = (query: string, values: any[]): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    let onError = (error: Error, results: QueryResult) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    }
    pool.query(query, values, onError)
  })
}

export default { pool }