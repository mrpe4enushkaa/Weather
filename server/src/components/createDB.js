const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.query("CREATE DATABASE IF NOT EXISTS weather", (err, result) => {
    if (err) return err;

    connection.end;

    const connectionDB = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'weather'
    });

    connectionDB.query(`CREATE TABLE IF NOT EXISTS data (
            id int NOT NULL AUTO_INCREMENT,
            city varchar(100) DEFAULT NULL,
            weather varchar(10) NOT NULL,
            temperature varchar(11) DEFAULT NULL,
            wind varchar(20) DEFAULT NULL,
            humidity varchar(3) DEFAULT NULL,
            date varchar(12) DEFAULT NULL,
            color varchar(7) DEFAULT NULL,
            PRIMARY KEY (id)
            )`, (err, result) => {
        if (err) return err;
    })
});


module.exports = { connection };