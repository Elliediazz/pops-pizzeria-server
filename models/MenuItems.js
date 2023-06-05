const mongoose = require('mongoose')

const MenuItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        requried: false
    }
    ,
    category: {
        type: String,
        requried: true
    }
    
})

module.exports = mongoose.model('MenuItems', MenuItemsSchema)