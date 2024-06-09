const express = require('express');
const { submitOrder, getOrders, updateOrderStatus } = require('../controllers/order');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/order/submitorder', submitOrder);
router.get('/order/getorder', getOrders);
router.post('/order/updatestatus', updateOrderStatus);

module.exports = router;