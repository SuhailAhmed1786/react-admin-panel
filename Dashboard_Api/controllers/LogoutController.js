// routes/logout.js
const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require('../connection');

const router = express.Router();

module.exports = async (req, res) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ Remove token from database
    connectDB.query(
      "UPDATE register SET token = NULL WHERE id = ?",
      [decoded.id],
      (dbErr) => {
        if (dbErr) {
          return res.status(500).json({ message: "Logout failed" });
        }

        return res.json({ message: "Logout successful" });
      }
    );
  });
}

// module.exports = router;