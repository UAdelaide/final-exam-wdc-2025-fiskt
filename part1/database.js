const mysql = require('mysql2/promise');
const { pool } = require('../part2/models/db');

const poll = mysql.createPool({
    host: 'localhost',
    user: 'root',
    passowrd: '',
    database: 'DogWalkService'
});

module.exports = pool;
