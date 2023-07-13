const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.PG_DB_URL,
});

pool.on('connect', () => {
  console.log('Connected to DB...');
});

pool.on('error', (err) => {
  console.error('Error connecting to the PostgreSQL database', err);
});

module.exports = {
  execute: (text, params) => pool.query(text, params),
  pool,
};
