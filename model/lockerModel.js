const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lockerSchema = new Schema({
    serialNumber: { type: String, unique: true, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: [{ type: String , default: [] }],
    rented: { type: Boolean, default: false },
    isLocked: { Boolean, default: false }
}, {
    timestamps: true
})

const lockerModel = mongoose.model('Locker', lockerSchema)

module.exports = lockerModel