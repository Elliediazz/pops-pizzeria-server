const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        require: true
    },
    products: [
        {
            _id: {
                type: String, 
                required: true
            },
            name: {
                type: String, 
                required: true
            },
            quantity: {
                type: String, 
                equired: true
            },
            price: {
                type: String, 
                required: true
            },
            image: {
                type: String, 
                required: false
            },
            selectedOptions: {
                type: String, 
                required: false
            },
            // need to incorperate in client
            cartQuantity: {
                type: Number, 
                required: true
            }
        },
    ],
    subtotal: { 
        type: Number, 
        required: true
    },
    total: { 
        type: Number, 
        required: true
    },
    // delivery or pick up
    orderType: { 
        type: String, 
        required: true
    }, 
    // delivery address
    delivery: { 
        type: Object, 
        required: false
    },
    order_status:{ 
        type: String, 
        default: 'pending'
    },
    payment_status:{ 
        type: String, 
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Orders', OrderSchema)