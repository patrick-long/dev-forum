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
})

module.exports = router;