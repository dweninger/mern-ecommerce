const Order = require('../models/order');
const Payment = require('../models/payment');

exports.submitOrder = async (req, res) => {
    try {
        const {user, guest, orderItems, orderTotal, payment} = req.body;
        let orderData = {orderItems: orderItems, orderTotal: orderTotal};

        if(user) {
            orderData.user = user;
        } else if (guest) {
            orderData.guest = {...guest};
        }

        const order = new Order(orderData);

        const savedOrder = await order.save();

        const paymentData = {
            order: order,
            amount: orderTotal,
            method: payment.method,
            provider: payment.provider,
            status: 'Pending',
        };

        const newPayment = new Payment(paymentData);
        await newPayment.save();

        order.payment = newPayment._id;
        await order.save();

        if (savedOrder) {
            return res.status(201).json({ order: savedOrder });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find()
      .select("_id user guest orderItems orderTotal orderStatus createdAt")
      .exec();
  
    res.status(200).json({ orders });
};

exports.updateOrderStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(
        id,
        { $set: { orderStatus: status } },
        { new: true, useFindAndModify: false }
        );

        if (!order) {
        return res.status(404).json({ message: 'Order not found' });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}
