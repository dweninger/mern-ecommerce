const express = require('express');
const { addItemToCart, getCartItems, removeItemFromCart } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);
router.post('/user/cart/removefromcart', requireSignin, userMiddleware, removeItemFromCart);
router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems);

module.exports = router;
