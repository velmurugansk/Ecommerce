const router = require('express').Router();
const {adminLogin, getUser} = require('../controllers/authController');
const {validateSession} = require('../middlewares/authMiddleware');

router.post('/adminlogin', adminLogin);
router.post('/getuser', validateSession,  getUser);

module.exports = router