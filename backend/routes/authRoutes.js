const router = require('express').Router();
const {adminLogin} = require('../controllers/authController')

router.post('/adminlogin', adminLogin);

module.exports = router