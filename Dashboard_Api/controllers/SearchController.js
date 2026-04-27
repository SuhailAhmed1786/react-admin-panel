const express = require('express')
const cors = require('cors'); // For web security
const app = express()
const connectDB = require('../connection');
app.use(express.json());
app.use(cors());

module.exports = (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ message: "Search query required" });
  }

  const sql = `
    SELECT * FROM register 
    WHERE username LIKE ? OR email LIKE ?`;

  const value = `%${search}%`;
  connectDB.query(sql, [value, value], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    // ✅ If no data found
    if (result.length === 0) {
      return res.status(404).json({
        message: "No user found",
        data: []
      });
    }

    return res.status(200).json({
      message: "Search results",
      data: result,
    });
  });
};