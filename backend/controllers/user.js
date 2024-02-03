const Address = require('../models/address');
const User = require('../models/user');

exports.createAddress = async (req, res) => {
    try {
        const { fullName, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newAddress = new Address({
            userId: req.user._id,
            fullName,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
        });

        const savedAddress = await newAddress.save();
        
        if(user.addresses) {
            user.addresses.push(savedAddress._id);
        } else {
            user.addresses = [];
            user.addresses.push(savedAddress._id);
        }
        
        await user.save();

        res.status(201).json(savedAddress);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('addresses');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userAddresses = user.addresses || [];

        res.status(200).json(userAddresses);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
