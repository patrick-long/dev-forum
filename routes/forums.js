const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('forums/index');
});

module.exports = router;