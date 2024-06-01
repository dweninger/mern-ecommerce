const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guest: {
        type: {
            fullName: String,
            email: String,
          }
    },
    address: {
        type: {
            fullName: String,
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        }
      },
    orderItems: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                default: 1, 
                required: true 
            },
        }
    ],
    orderTotal: {type: Number, required: true},
    orderStatus: {
        type: String,
        enum: ['Placed', 'Pending', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Placed',
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
}, {timestamps: true});

orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);