const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'j,LYsVEc2N5v',
    database: 'company'
});

module.exports = db;