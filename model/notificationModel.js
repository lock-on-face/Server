const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    locker: { type: Schema.Types.ObjectId, ref: "Locker", required: true },
    message: { type: String, required: true },
    due: { type: Date, required: true }
})

const notificationModel = mongoose.model('Notification', notificationSchema)

module.exports = notificationModel