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

router.post('/new', (req, res) => {
    Forum.create(req.body, (err, forum) => {
        if (err) { 
            return res.redirect('/forums/new') 
        };
        res.redirect(`/forums`);
        console.log(req.body);
    });
});



module.exports = router;