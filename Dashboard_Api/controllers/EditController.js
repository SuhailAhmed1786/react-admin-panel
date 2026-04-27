const express = require('express')
const cors = require('cors'); // For web security
const app = express()
const connectDB = require('../connection');
// const bcrypt = require("bcryptjs");
app.use(express.json());
app.use(cors());

module.exports = async (req, res) => {
  const token = req.headers["authorization"];
  const id = req.params.id;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { username, email, phone } = req.body;

  // if (!username || !email) {
  //   return res.status(400).json({ message: "Username and Email are required" });
  // }

  try {
    const sql = `
      UPDATE register 
      SET username = ?, email = ?, phone = ?
      WHERE id = ?
    `;

    connectDB.query(
      sql,
      [username, email, phone, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database update failed" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
          data: {username, email, phone},
          status : 200,
          message: "User updated successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};