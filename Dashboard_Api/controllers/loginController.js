const express = require('express')
const cors = require('cors'); // For web security
const app = express()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require('../connection');
require("dotenv").config();
// const verifyToken = require('../middleware/authenticateToken');

app.use(express.json());
app.use(cors());


module.exports = (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login attempt:", email, password, role);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  connectDB.query(
    "SELECT * FROM register WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];
      console.log(user)

      if (user.role !== role) {
          return res.status(403).json({ message: "Invalid role selected" });
        }

      try {
        const isMatch = await bcrypt.compare(password, user.password);
        
        // console.log("ismatch", isMatch);

        // if (!isMatch) {
        //   return res.status(400).json({ message: "Invalid credentials" });
        // }

        // ✅ Generate JWT
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );

        // ✅ Store token in database
        connectDB.query(
          "UPDATE register SET token = ? WHERE id = ?",
          [token, user.id],
          (updateErr) => {
            // ✅ Check if token already exists
                if (user.token) {
                  return res.status(400).json({
                    message: "User already logged in"
                  });
                }
            if (updateErr) {
              console.log("Token update error:", updateErr);
              return res.status(500).json({ message: "Token store failed" });
            }

            return res.json({
              status: 200,
              message: "Login successful",
              token: token,
              data: { username: user.username, role: user.role }
            });
          }
        );

        connectDB.query(
          "SELECT * FROM register WHERE token = ?",
          [token],
          (err, result) => {
            if (err) {
              return res.status(500).json({ message: "Database error" });
            }

            if (result.length === 0) {
              return res.status(401).json({ message: "Token not found" });
            }

            console.log("Token exists for user:", result[0].email);
          }
        );

      } catch (error) {
        console.log("Server error:", error);
        return res.status(500).json({ message: "Server error" });
      }
    }
  );
};