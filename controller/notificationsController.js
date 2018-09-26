const notificationModel = require('../model/notificationModel')

class Controller {

    static create (req, res) {
        notificationModel.create(req.body)
        .then((notification => {
            res
            .status(201)
            .json({
                msg: "succefully created notification",
                data: notification
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json({
                msg: "failed tp create notification",
                err
            })
        }))
    }

    static read (req, res) {
        let { owner } = req.body
        notificationModel.find({
            owner
        })
        .populate('owner')
        .then((data => {
            res
            .status(200)
            .json({
                msg: "succesfully fetched notification",
                data
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json({
                msg: "failed to fetch development",
                err
            })
        }))
    }

    static delete (req, res) {
        let { id } = req.params
        notificationModel.findByIdAndRemove(id)
        .then((result => {
            res
            .status(201)
            .json({
                msg: "succesfully deleted notification",
                data: result
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json({
                msg: "failed to delete notification",
                err
            })
        }))
    }

}

module.exports = Controller