// Require modules 
const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const methodOverride = require('method-override');
const port = 3000; 
const session = require('express-session'); 

// Require routers
const usersRouter = require('./routes/users');
const forumsRouter = require('./routes/forums');
const responseRouter = require('./routes/response');

// Set up an express app
const app = express();

// Connect to a database 
require('./config/database');

// Set the view engine to use ejs files
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Create express session
app.use(session({
    secret:'supersecret',
    resave: false,
    saveUninitialized: false
}));

// Mount routes with app.use()
app.use('/', usersRouter);
app.use('/forums', forumsRouter);
app.use('/', responseRouter);

// Set port to listen on localhost:3000
app.listen(port, function() {
    console.log(`Express is listening on port ${port}`);
})