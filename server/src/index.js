const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql2');
const { createDB } = require('./components/createDB');

const app = express();

createDB;

dotenv.config({ path: '../.env' });

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'weather'
});

app.post('/api/addData', (req, res) => {
    connection.query('SELECT * FROM data', (err, result) => {
        if (err) {
            console.error("Error selecting data:", err);
            return res.json({ message: "Data didn't select from database" });
        }

        let oldArray = result.map(({ id, ...rest }) => rest);

        let newData = req.body && Array.isArray(req.body) ? req.body : [req.body];

        let newArray = [...newData, ...oldArray];

        connection.query('TRUNCATE data', (err) => {
            if (err) {
                return res.json({ message: "Data didn't truncate from database" });
            }

            let insertPromises = newArray.map((element, index) => {
                const { city, weather, temperature, wind, humidity, date, color } = element;

                return new Promise((resolve, reject) => {
                    connection.query(
                        'INSERT INTO data (city, weather, temperature, wind, humidity, date, color) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [city, weather, temperature, wind, humidity, date, color],
                        (err, result) => {
                            if (err) {
                                reject(`Data didn't add to database`);
                            } else {
                                resolve(`Data added successfully for element ${index + 1}`);
                            }
                        }
                    );
                });
            });

            Promise.all(insertPromises)
                .then(() => res.json({ message: "All data added successfully" }))
                .catch(error => {
                    console.error("Error in inserting data:", error);
                    res.json({ message: error });
                });
        });
    });
});

app.get('/api/getData', (req, res) => {
    connection.query('SELECT * FROM data', (err, result) => {
        if (err) {
            return res.json({ message: "Data didn't send to server" })
        }

        res.json(result);
    })
});

app.use((req, res) => {
    res.status(404).json({ message: "Page not found" })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})