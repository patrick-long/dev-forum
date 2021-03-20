const router = require('express').Router(); 
const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.login);

module.exports = router;