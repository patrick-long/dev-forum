const router = require('express').Router();
const Forum = require('../models/forum');

// generates index view of all forum posts 
router.get('/', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.find({}, (err, forums) => {
            res.render('forums/index', {
                forums
            });
        });
    } else {
        res.redirect('/users/login');
    };
});

// generates form to create a new forum post
router.get('/new', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        res.render('forums/new');
    } else {
        res.redirect('/users/login');
    };
});

// generates show view for a specific forum
router.get('/:id', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.findById(req.params.id, (err, forums) => {
            res.render('forums/show', {
                forums,
                title: forums.title
            });
        });
    } else {
        res.redirect('/users/login');
    };
});

// creates new forum post
router.post('/', (req, res) => {
    // try to replace spaces in between tags with a function that makes them into divs?? 
    // req.body.tags = req.body.tags.replace(/\s*/g, (match) => {
        
    // })
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.create(req.body, (err, forum) => {
            if (err) { 
                res.send(`Oops! ${err._message}. Title, content and tags are all required to submit form.`);
            } else {
            res.redirect(`/forums`);
            }
        });
    } else {
        res.redirect('/users/login');
    };
});

// deletes a specific post
router.delete('/:id', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.deleteOne({ _id: req.params.id }, (err, forum) => {
            res.redirect('/forums');
        });
    } else {
        res.redirect('/users/login');
    };
});

// generates form to edit forum post
router.get('/:id/edit', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.findById({ _id: req.params.id }, (err, forum) => {
            if (err) {
                res.send(`Oops! ${err._message}. Title, content and tags are all required for submit form.`);
            } else {
                res.render('forums/edit', {
                    forum,
                    title: forum.title
                });
            };
        });
    } else {
        res.redirect('/users/login');
    };
});

// saves changes from forum update form
router.put('/:id', async (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        await Forum.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/forums/${req.params.id}`);
    } else {
        res.redirect('/users/login');
    };
});


module.exports = router;