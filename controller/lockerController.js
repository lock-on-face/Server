const lockerModel = require('../model/lockerModel')

class Controller {

    static createLocker (req, res) {
        lockerModel.create(req.body)
        .then((locker => {
            res
            .status(201)
            .json({
                msg: "succesfully created locker",
                data: locker
            })
        }))
        .catch((err => {
            console.log(err.message)
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
                data: lockers
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
        let { owner } = req.body
        lockerModel.find({owner})
        .populate('owner')
        .then((locker => {
            console.log('ini dari get one',locker)
            res
            .status(200)
            .json({
                msg: "got specific locker",
                data: locker
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
        let { id } = req.params
        lockerModel.findByIdAndUpdate(id, req.body)
        .then((result => {
            console.log('ini masuk then update',result)
            res
            .status(201)
            .json({
                msg: "succesfully updated",
                data: result
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

    static deleteLocker (req, res) {
        let { id } = req.params
        lockerModel.findByIdAndRemove(id)
        .then((result => {
            res
            .status(201)
            .json({
                msg: "succesfully deleted locker and its contents",
                data: result
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