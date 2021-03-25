const router = require('express').Router();
const Forum = require('../models/forum');

// generates index view of all forum posts 
router.get('/', (req, res) => {
    Forum.find({}, (err, forums) => {
        res.render('forums/index', {
            forums
        });
    })
});

// generates form to create a new forum post
router.get('/new', (req, res) => {
    res.render('forums/new');
});

// generates show view for a specific forum
router.get('/:id', (req, res) => {
    Forum.findById(req.params.id, (err, forums) => {
        res.render('forums/show', {
            forums,
            title: forums.title
        });
    });
});

// creates new forum post
router.post('/', (req, res) => {
    // req.body.tags = req.body.tags.replace(/\s*/g, (match) => {
        
    // })
    Forum.create(req.body, (err, forum) => {
        if (err) { 
            res.send(`Oops! ${err._message}. Title, content and tags are all required to submit form.`);
            return;
        };
        res.redirect(`/forums`);
    });
});

// deletes a specific post
router.delete('/:id', (req, res) => {
    Forum.deleteOne({ _id: req.params.id }, (err, forum) => {
        res.redirect('/forums');
    });
});

// generates form to edit forum post
router.get('/:id/edit', (req, res) => {
    Forum.findById({ _id: req.params.id }, (err, forum) => {
        if (err) {
            res.send(`Oops! ${err._message}. Title, content and tags are all required for submit form.`);
        } else {
            res.render('forums/edit', {
                forum,
                title: forum.title
            })
        }
    })
});

// saves changes from forum update form
router.put('/:id', async (req, res) => {
    await Forum.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/forums/${req.params.id}`);
});


module.exports = router;