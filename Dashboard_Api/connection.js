const express = require('express')
const mysql = require('mysql2'); // MySQL2 client for Node.js
// const cors = require('cors'); // For web security
const app = express()
// const port = 5000
app.use(express.json());
// app.use(cors());

const connectDB = mysql.createConnection({
  host: "localhost", // Database host
  user: "root",      // Database username
  password: "", // Database password
  database: "mydatabase", // Name of the database
})
connectDB.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database successfully!');
});


module.exports = connectDB;