const router = require('express').Router(); 
const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const saltRounds = parseInt(process.env.SALT_ROUNDS);

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
});

// creates new account for a user with a unique username
router.post('/users/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(saltRounds)); 
    User.create(req.body, (err, newUser) => {
        if (err) {
            res.render('users/new-error');
        } else {
            console.log(newUser);
            res.redirect('/forums');
        };
    });
});


// logs in to an existing account 
router.post('/users/signin', (req, res) => {
    // look up user by username
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        // if user not found -> redirect to signin page
        if (foundUser === null) {
            res.render('login-error');
        } else {
            // compares password with DB of created users
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            // if password is correct -> create session and load forums page
            if (doesPasswordMatch) {
                req.session.userId = foundUser._id;
                console.log(req.session);
                res.redirect('/forums');
            } else { 
                res.redirect('users/login');
            };
        };
    });
});

// logs a user out of the website -> destroy session
router.get('/users/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
});

module.exports = router;