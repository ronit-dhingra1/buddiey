// Description: A file that handles the schemas for the things that need to be validated before sent to server
const Joi = require('joi');

// User validation schemas
function authVal(data) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    });
    return schema.validate(data);
};

// Blogpost validation schemas
function msgVal(data) {
    const schema = Joi.object({
        email: Joi.string().required(),
        message: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports.authVal = authVal;
module.exports.msgVal = msgVal;