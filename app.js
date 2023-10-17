const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000; // Change to your preferred port number

// PostgreSQL database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432, // Change to your PostgreSQL port
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., HTML and CSS)
app.use(express.static('public'));


// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile( '/index.html'); // Adjust the path as needed
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const data = req.body;

    // Insert form data into the PostgreSQL database
    pool.query(
        'INSERT INTO project (name, dob, mobile, email, address, gender, fathername, course, percentage12th) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
            data.name,
            data.dob,
            data.mobile,
            data.email,
            data.address,
            data.gender,
            data.fatherName,
            data.course,
            data.percentage12th,
        ],
        (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
                res.status(500).json({ success: false, message: 'Error inserting data' });
            } else {
                console.log('Data inserted successfully');
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

