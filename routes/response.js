const router = require('express').Router();
const Forum = require('../models/forum');

router.post('/forums/:id/responses', (req, res) => {
    Forum.findById(req.params.id, (err, forum) => {
        forum.responses.push(req.body);
        forum.save((err) => {
            res.redirect(`/forums/${forum._id}`);
        })
    })
});

module.exports = router;