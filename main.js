// Description: This is the file that handles the runtime

// Import our packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// Initialize passport
const User = require('./models/User');
const initialize = require('./passport-config');
initialize(passport, (email) => {
    const user = User.findOne({ email: email});
    return user;
});

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
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('chat/chat'));

app.get('/load', (req, res) => res.render('loading'));

// Run server
app.listen(port, () => console.log(`The Buddiey web app is running at port ${port}`));