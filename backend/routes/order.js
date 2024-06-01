const express = require('express');
const { submitOrder } = require('../controllers/order');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/order/submitorder', submitOrder);

module.exports = router;