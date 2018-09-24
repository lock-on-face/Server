const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailValidator = function(email) {
    return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email) 
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: [emailValidator, 'please give a valid meail'] 
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    credits: { type: Number , default: 10 },
    isAdmin: { type: Boolean, default: false },
    imageFile: { type: String, required: true },
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel