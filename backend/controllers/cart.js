const Cart = require('../models/cart');

function runUpdate(condition, updateData) {
    return Cart.findOneAndUpdate(condition, updateData, { upsert: true }).exec();
}

exports.addItemToCart = async (req, res) => {
    console.log("ADD ITEM TO CART");
    try {
        const existingCart = await Cart.findOne({ user: req.user._id });
        console.log("existingCart:", existingCart);
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
        console.log("Controllers add cart error");
        return res.status(400).json({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('cartItems.product', '_id name price productPictures');

        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
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

