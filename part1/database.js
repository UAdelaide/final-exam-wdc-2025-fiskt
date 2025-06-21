const mysql = require('mysql2/promise');

const poll = mysql.createPool({
    host: 'localhost',
    user
})