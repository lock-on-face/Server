const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lockerSchema = new Schema({
    serialNumber: { type: String, unique: true, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    items: [{ type: String }]
}, {
    timestamps: true
})

const lockerModel = mongoose.model('Locker', lockerSchema)

module.exports = lockerModel