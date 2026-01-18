import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool } from '../db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const sqlPath = path.join(__dirname, '..', 'sql', 'init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Running init.sql...');
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('DB initialized successfully ✅');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error('DB init failed ❌');
  console.error(e);
  process.exit(1);
});
