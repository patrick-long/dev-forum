const router = require('express').Router();
const Forum = require('../models/forum');

router.get('/', (req, res) => {
    Forum.find({}, (err, forums) => {
        res.render('forums/index', {
            forums
        });
    })
});

router.get('/new', (req, res) => {
    res.render('forums/new');
});

router.get('/:id', (req, res) => {
    Forum.findById({_id: req.params.id}, (err, forums) => {
        res.render('forums/show', {
            forums,
            title: forums.title
        });
    });
});

router.post('/', (req, res) => {
    Forum.create(req.body, (err, forum) => {
        if (err) { 
            res.send(`Oops! ${err._message}. Title, content and tags are all required to submit form.`) 
        };
        res.redirect(`/forums`);
        console.log(req.body);
    });
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Forum.deleteOne({ _id: req.params.id }, (err, forum) => {
        res.redirect('/forums');
    });
});

router.get('/:id/edit', (req, res) => {
    Forum.findById({ _id: req.params.id }, (err, forum) => {
        if (err) {
            console.log(err);
        } else {
            res.render('forums/edit', {
                forum,
                title: forum.title
            })
        }
    })
});

router.put('/:id', async (req, res) => {
    await Forum.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/forums/${req.params.id}`);
});


module.exports = router;