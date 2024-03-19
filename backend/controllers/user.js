const Address = require('../models/address');
const User = require('../models/user');

exports.createAddress = async (req, res) => {
    try {
        console.log("CREATING ADDRESS: ", req.body);
        const { fullName, address, address2, city, state, zip, country, userId } = req.body.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newAddress = new Address({
            userId: user._id,
            fullName: fullName,
            addressLine1: address,
            addressLine2: address2,
            city: city,
            state: state,
            postalCode: zip,
            country: country,
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
        console.log("FAILED TRY IN CREATE ADDRESS");
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
