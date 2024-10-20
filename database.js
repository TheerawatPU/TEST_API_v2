require('dotenv').config();

const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'default',
//   password: 'pSTjM5hBqn1w',
//   host: 'ep-divine-heart-a1lqglrp-pooler.ap-southeast-1.aws.neon.tech',
//   port: 5432,
//   database: 'verceldb',
//   ssl: {
//     rejectUnauthorized: false, // This allows connections without verifying the server's SSL certificate
//   },
// });

// comment v 2

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Handle SSL
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connection to the database successful!');
    release(); 
  }
});

module.exports = pool;
