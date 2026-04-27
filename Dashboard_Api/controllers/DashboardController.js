const express = require('express')
const cors = require('cors'); // For web security
const app = express()
const connectDB = require('../connection');
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());

module.exports = async (req, res) => {
  try {
    connectDB.query("SELECT * FROM register", (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.status(200).json({ data: result });
      }
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }

}

