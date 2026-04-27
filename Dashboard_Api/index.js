
const express = require("express");
const app = express();
const cors = require('cors'); // For web security
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var indexRouter = require('./routes/index.js');
require("dotenv").config();
// middleware to set response headers for assets
app.use("/assets", (req, res, next) => {
	// setting the response headers
	res.setHeader("Cache-Control", "public, max-age=3600"); 
	// cache control header
	// next middleware or route handler
	next();
});
// serving static assets from the 'public' directory
app.use("/assets", express.static("public"));
// route handler
app.use('/', indexRouter);
// app.use('/users', usersRouter);
// start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
