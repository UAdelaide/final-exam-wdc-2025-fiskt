const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    passowrd: '',
    database: 'DogWalkService'
});

module.exports = pool;
