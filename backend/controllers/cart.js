const Cart = require('../models/cart');

exports.addItemToCart = async (req, res) => {
    try {
        const existingCart = await Cart.findOne({ user: req.user._id });
        if (existingCart) {
            const product = req.body.cartItems.product;
            const item = existingCart.cartItems.find(c => c.product == product);
            let condition, update;
            if(item) {
                condition = { user: req.user._id, "cartItems.product": product };
                update = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };

            } else {
                condition = { user: req.user._id } ;
                update = {
                    "$push": {
                        "cartItems": [req.body.cartItems]
                    }
                };
            }
            const updatedCart = await Cart.findOneAndUpdate(condition, update);
            if(updatedCart) {
                return res.status(201).json({ cart: updatedCart });
            }

        } else {
            const newCart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems,
            });

            const savedCart = await newCart.save();
            return res.status(201).json({ cart: savedCart });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
