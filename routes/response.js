const router = require('express').Router();
const Forum = require('../models/forum');

// creates new response post on forum show page
router.post('/forums/:id/responses', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.findById(req.params.id, (err, forum) => {
            forum.responses.push(req.body);
            forum.save((err) => {
                if (err) {
                    res.send(`Oops! ${err._message}. Both content and rating are required to submit a response`);
                } else {
                    res.redirect(`/forums/${forum._id}`);
                };
            });
        });
    } else {
        res.redirect('/users/login');
    };
});

// deletes a specific response on forum show page
router.delete('/responses/:id', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.findOne({ 'responses._id': req.params.id }, (err, forum) => {
            forum.responses.pull(req.params.id);
            forum.save((err) => {
                if (err) {
                console.log(err);
                } else {
                res.redirect(`/forums/${forum._id}`);
                };
            });
        });
    } else {
        res.redirect('/users/login');
    };
});

// generates form needed to update/edit responses to forum posts
router.get('/responses/:id/edit', (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        Forum.findOne({ 'responses._id': req.params.id }, (err, forums) => {
            res.render('responses/edit', {
                forums,
                responses: forums.responses,
                responseId: req.params.id,
                title: forums.title
            });
        });
    } else {
        res.redirect('/users/login');
    };
});

// posts the edited response to the forum show page
router.put('/responses/:id', async (req, res) => {
    // requires that a session be started to access 
    if (req.session.userId) {
        await Forum.findOne({ 'responses._id': req.params.id }, (err, forum) => {
            const response = forum.responses.id(req.params.id); 
            response.overwrite(req.body);
            forum.save((err) => {
                if (err) {
                    res.send(`Oops! ${err._message}. Both content and rating are required to submit an edit for a response.`);
                } else {
                    res.redirect(`/forums/${forum._id}`)
                };
            });
        });
    } else {
        res.redirect('/users/login');
    };
});


module.exports = router;