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
    const { username, email, phone, password, confirmpassword } = req.body;

    if (!username || !email || !phone || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email exists first
    const checkSql = "SELECT * FROM register WHERE email = ?";
    connectDB.query(checkSql, [email], async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const insertSql =
        "INSERT INTO register (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)";

      connectDB.query(
        insertSql,
        [username, email, phone, password, "user"],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
          }
          res.status(201).json({ 
            message: "User registered successfully",
            data: { username, email, phone, role: "user" }
           });
        }
      );
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};