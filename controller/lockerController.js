const lockerModel = require('../model/lockerModel')

class Controller {

    static createLocker (req, res) {
        lockerModel.create(req.body)
        .then((locker => {
            res
            .status(201)
            .json({
                msg: "succesfully created locker",
                locker
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json({
                msg: "oops failed to create locker",
                err
            })
        }))
    }

    static getLocker (req, res) {
        lockerModel.find({})
        .populate("owner")
        .then((lockers => {
            res
            .status(200)
            .json({
                msg: "list of lockers and their owners",
                lockers
            })
        }))
        .catch((err => {
            res
            .status(500)
            .json({
                msg: "failed to get locker",
                err
            })
        }))
    }

    static getOne (req, res) {
        let { _id } = req.body
        lockerModel.findById(_id)
        .then((locker => {
            res
            .status(200)
            .json({
                msg: "got specific locker",
                locker
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json({
                msg: "couldnt complete request",
                err
            })
        }))
    }

    static updateLocker (req, res) {
        let { _id } = req.body
        lockerModel.findByIdAndUpdate(_id, req.body)
        .then((result => {
            res
            .status(201)
            .json({
                msg: "succesfully updated",
                result
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json({
                msg: "oops something went wrong",
                err
            })
        }))
    }

    static delleteLocker (req, res) {
        let { _id } = req.body
        lockerModel.findByIdAndRemove(_id)
        .then((result => {
            res
            .status(201)
            .json({
                msg: "succesfully deleted locker and its contents",
                result
            })
        }))
        .catch((err => {
            res
            .status(400)
            .json(({
                msg: "locker not found",
                err
            }))
        }))
    }

}

module.exports = Controller