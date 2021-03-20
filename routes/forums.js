const router = require('express').Router();
const forumsCtrl = require('../controllers/forums');

router.get('/', forumsCtrl.index);

module.exports = router;