// Description: This is the file that handles the runtime

// Import our packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Create important variables
const app = express(); // Our app instance
const port = process.env.PORT || 3000; // Our port instance

// Import our routes
const authRouter = require('./routes/auth/auth');
const chatRouter = require('./routes/chat/chat');

// Configure our environment variables
dotenv.config();

// Connect to our database
mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
    console.log('Connected to Buddiey DB!');
    }
);

// Express Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use(express.static("public"));

// Run server
app.listen(port, () => console.log(`The Buddiey web app is running at port ${port}`));