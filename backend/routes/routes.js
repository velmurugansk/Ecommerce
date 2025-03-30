const router = require('express').Router();
const {tokenVerify, verify} = require('../middlewares/authMiddleware');
const {userRegister, userLogin, userLogout, userDetails} = require('../controllers/authController');
const {productList} = require('../controllers/productController');
const {getCart, addtoCart} = require('../controllers/cartController');

router.post('/auth/login', userLogin);
router.post('/user/list', userDetails);
router.get('/verify', verify);
router.get('/product/list', productList);
router.get('/cart/list', tokenVerify, getCart);
router.post('/cart/add', tokenVerify, addtoCart);
router.post('/logout', userLogout);
module.exports = router