const router = require('express').Router();
const Forum = require('../models/forum');

router.post('/forums/:id/responses', (req, res) => {
    Forum.findById(req.params.id, (err, forum) => {
        forum.responses.push(req.body);
        console.log(forum.responses.id);
        forum.save((err) => {
            res.redirect(`/forums/${forum._id}`);
        })
    })
});

router.delete('/responses/:id', (req, res) => {
    Forum.findOne({ 'responses._id': req.params.id }, (err, forum) => {
        forum.responses.pull(req.params.id);
        forum.save((err) => {
            if (err) {
            console.log(err);
            } else {
            res.redirect(`/forums/${forum._id}`);
            }
        })
    })
});

router.get('/responses/:id/edit', (req, res) => {
    Forum.findOne({ 'responses._id': req.params.id }, (err, forums) => {
        res.render('responses/edit', {
            forums,
            responses: forums.responses
        })
    })
});

router.put('/responses/:id', (req, res) => {
    Forum.findOne({ 'responses._id': req.params.id }, (err, forum) => {
        const response = forum.responses.id(req.params.id); 
        response.overwrite(req.body);
        forum.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect(`/forums/${forum._id}`)
            }
        })
    })
});


module.exports = router;