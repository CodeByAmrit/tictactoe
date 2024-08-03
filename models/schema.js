const mysql = require('mysql2/promise');
require('dotenv').config()
const fs = require('fs');
const path = require('path');

const con = mysql.createPool({
  host: 'mysql-game-tictactoe-amritsharma54300-7ee3.e.aivencloud.com',
  user: 'web',
  password: process.env.password,
  database: process.env.DATABASE,  // Ensure the correct environment variable is used
  port: 23074,
  ssl: {
    ca: fs.readFileSync('/etc/secrets/ca.pem')
  }
});

// async function runQuery() {
//   try {
//     const [rows, fields] = await con.query('SELECT * FROM users');
//     console.log('Rows:', rows);
//   } catch (error) {
//     console.error('Query error:', error);
//   }
// }

// runQuery();

module.exports = { con };
