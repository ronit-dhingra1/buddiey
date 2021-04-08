// Description: This file holds the schema for the User object for the Buddiey app

// Import our libraries
const mongoose = require('mongoose');

// Create our schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const model = mongoose.model('User', userSchema);

// Export the model
module.exports = model;