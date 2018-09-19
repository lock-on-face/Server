const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lockerModel = new Schema({
    serialNumber: { type: String, unique: true, required: true },
    owner: { type: Schema.Types.ObjectId('User') }
}, {
    timestamps: true
})

module.exports = lockerModel