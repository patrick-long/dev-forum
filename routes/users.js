const router = require('express').Router(); 
const User = require('../models/user');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = process.env.salt_rounds; 

// reroutes user from root route to login screen
router.get('/', (req, res) => {
    res.redirect('/users/login');
});

// generates the login screen for a user
router.get('/users/login', (req, res) => {
    res.render('login');
});

// generates a sign up form for the user to create an account
router.get('/users/new', (req, res) => {
    res.render('users/new');
})

// router.post('/')

module.exports = router;