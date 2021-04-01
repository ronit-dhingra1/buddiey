// Description: This is a router that handles all of the authentication
const express = require('express');
const router = express.Router();

// Get our model
const User = require('../../models/User');

// MARK: Routes

// GET on login page (load the view)
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

// POST on login page (perform the login request)
router.post('/signin', (req, res) => {
    
});

// GET on signup page (load the view)
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// POST on signup page (perform the signup request)
router.post('/signup', (req, res) => {
    
});


// Export our router for the main runtime file
module.exports = router;