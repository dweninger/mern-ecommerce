const Address = require('../models/address');
const User = require('../models/user');

exports.createAddress = async (req, res) => {
    try {
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

        res.status(201).json(user.addresses);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.removeAddress = async (req, res) => {
    try {
        const addressIndex = req.params.addressIndex;
        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (addressIndex < 0 || addressIndex >= user.addresses.length) {
            return res.status(400).json({ error: 'Invalid address index' });
        }

        const removedAddress = user.addresses.splice(addressIndex, 1);
        await user.save();

        await Address.findByIdAndDelete(removedAddress);

        res.status(200).json(user.addresses);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

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
