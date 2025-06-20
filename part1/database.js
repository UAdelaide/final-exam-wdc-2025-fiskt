var mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    passowrd: 'root',
    database: 'DogWalkService'
});

module.exports = pool.promise