const mysql = require('mysql2/promise');

const con = mysql.createPool({
  host: 'localhost',
  user: 'web',
  password: 'Webuser@1234',
  database: 'game'
});

module.exports = { con };
