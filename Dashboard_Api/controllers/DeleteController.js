const express = require('express')
const cors = require('cors'); // For web security
const app = express()
const connectDB = require('../connection');
const bcrypt = require("bcryptjs");
app.use(express.json());
app.use(cors());


module.exports =  (req, res) => {
  const id = req.params.id;
  connectDB.query(
    "DELETE FROM register WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query failed" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "User deleted successfully"
      });
    }
  );
}