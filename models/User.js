const mongoose = require('mongoose')
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2, 
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        minlength: 3,
        maxlength: 200,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
        
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Minimum password length must be 6 characters'],
        maxlength: 1024
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)