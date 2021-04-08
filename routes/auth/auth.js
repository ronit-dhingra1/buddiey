// Description: This is a router that handles all of the authentication
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { authVal } = require('../../utils/validation');
const jwt = require('jsonwebtoken')

// Get our model
const User = require('../../models/User');

// Function that verifies the token
const isLoggedIn = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (!token) { return res.redirect('/auth/signin'); }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send(`Invalid Token: ${error.message}`);
    }
}

// MARK: Routes

// GET on sign in page (load the view)
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

// POST on sign in page (perform the login request)
router.post('/signin', async (req, res) => {
    console.log(`Attempting to login user: ${req.body.email}`);

    // Validate the input
    const { error } = authVal(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }

    // Check if email is already found in database
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        console.log(`The user ${req.body.email} doesn't exist`)
        return res.status(400).send(`The email ${req.body.email} does not exist in the database`);
    }

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) { return res.status(400).send('The password is incorrect'); }

    // Create and assign an authorization token
    const token = user.token;

    // Return the success response with the token
    console.log(`Logged in successfully: ${req.body.email}`);
    res.cookie('auth-token', token).redirect('/');
});

// GET on signup page (load the view)
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// POST on signup page (perform the signup request)
router.post('/signup', isLoggedIn, async (req, res) => {
    console.log(`Attempting to create account with email: ${req.body.email}`);

    // Validate the input
    const { error } = authVal(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }

    // Check if email is already found in database
    const emailExists = await User.model.findOne({email: req.body.email});
    if (emailExists) { return res.status(400).send(`The email ${req.body.email} already exists in the database`); }

    // Hash the user's password
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create an identification token for the account
    const token = jwt.sign({uname: req.body.email}, process.env.TOKEN_SECRET);

    // Create the user
    const user = new User.model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        token: token
    });

    // Try to save the user to our database
    try {
        // Save the user to the database
        const savedUser = user.save();

        // Return the success response with the token
        console.log(`Signed up successfully: ${savedUser.email}`);
        res.cookie('auth-token', token).redirect('/');
    }
    catch (err) {
        res.statusMessage(400).send(`Oops, couldn't save: ${err}`);
    }
});


// Export our router for the main runtime file
module.exports = router;