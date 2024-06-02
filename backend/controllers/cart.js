const Cart = require('../models/cart');

function runUpdate(condition, updateData) {
    return Cart.findOneAndUpdate(condition, updateData, { upsert: true }).exec();
}

exports.addItemToCart = async (req, res) => {
    try {
        const existingCart = await Cart.findOne({ user: req.user._id });
        if (existingCart) {
            let promiseArray = [];
            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = existingCart.cartItems.find(c => c.product == product);
                let condition, update;
                if (item) {
                    condition = { user: req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": cartItem,
                        },
                    };
                } else {
                    condition = { user: req.user._id };
                    update = {
                        "$push": {
                            "cartItems": cartItem,
                        }
                    };
                }
                promiseArray.push(runUpdate(condition, update));
            });

            Promise.all(promiseArray)
                .then(response => res.status(201).json({ response }))
                .catch(error => res.status(400).json({ error }));

        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems,
            });

            const savedCart = await cart.save();
            if (savedCart) {
                return res.status(201).json({ cart: savedCart });
            }
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const existingCart = await Cart.findOne({ user: req.user._id });

        if (existingCart) {
            // Verify the structure of incoming cartItems
            if (!Array.isArray(Object.values(req.body.cartItems)) || !Object.values(req.body.cartItems).every(item => item._id)) {
                return res.status(400).json({ error: "Invalid cart items structure" });
            }

            // Update the existing cartItems based on incoming request data
            const newCartItems = Object.values(req.body.cartItems).map(item => {
                const existingItem = existingCart.cartItems.find(ci => ci.product.toString() === item._id);
                return {
                    product: existingItem.product,
                    quantity: item.qty,
                };
            });

            // Replace cartItems with the new array from the request body
            existingCart.cartItems = newCartItems;

            // Save the updated cart
            await existingCart.save();

            if (existingCart.cartItems.length === 0) {
                await Cart.findByIdAndRemove(existingCart._id);
                return res.status(200).json({ message: "Cart removed successfully" });
            }

            res.status(201).json({ cartItems: existingCart.cartItems });
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        console.error("Controllers remove cart error:", error); // Improved error logging
        return res.status(400).json({ error: error.message });
    }
};

exports.clearUserCart = async (req, res) => {
    const userId = req.user._id; // Assuming you have user information in req.user

    try {
        await Cart.deleteMany({ user: userId });
        return res.status(200).json({ message: 'User cart cleared' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('cartItems.product', '_id name price productPictures');

        if (!cart) {
            return res.status(204).json({ error: 'Cart not found' });
        }
        const cartItems = cart.cartItems.map((item) => ({
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
        }));

        res.status(200).json({ cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
