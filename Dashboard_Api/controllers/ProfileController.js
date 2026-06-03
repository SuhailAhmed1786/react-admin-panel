const express = require('express')
const cors = require("cors");
const app = express();
const connectDB = require('../connection');
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    
require("dotenv").config();

app.use(express.json());
app.use(cors());    
module.exports = (req, res) => {
    const { username, email, phone, address, bio } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = req.params.id;
  
    connectDB.query(
        "UPDATE register SET username = ?, email = ?, phone = ? WHERE id = ?",
        [username, email, phone, userId], 
        (err, result) => {
              console.log("updated Id", result)
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Database error" });
            }
            res.json({ message: "Profile updated successfully" });
        }
    );
}           