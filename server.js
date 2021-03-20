// Require modules 
const express = require('express');
const morgan = require('morgan');
const port = 3000; 
const session = require('express-session'); 

// Require routers
const indexRouter = require('./routes/index');
const forumsRouter = require('./routes/forums');
const { urlencoded } = require('express');

// Set up an express app
const app = express();

// Connect to a database 
// require('./config/database');

// Set the view engine to use ejs files
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Create express session
app.use(session({
    secret:'supersecret',
    resave: false,
    saveUninitialized: false
}));

// Mount routes with app.use()
app.use('/', indexRouter);
app.use('/forums', forumsRouter);

// Set port to listen on localhost:3000
app.listen(port, function() {
    console.log(`Express is listening on port ${port}`);
})