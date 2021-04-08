const LocalStrategy = require('passport-local').Strategy; 
const initializePassport = (passport) => {
    passport.use(new LocalStrategy({ emailField: "email" }), authenticate);
};