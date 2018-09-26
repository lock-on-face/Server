const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');

class Controller {
    
    static getAll (req, res) {
        userModel.find()
        .then((data => {
            res
            .status(200)
            .json({
                data
            })
        }))
        .catch((err => {
            res
            .status(500)
            .json(err)
        }))
    }

    static signUp(req,res){
        let saltRounds = 5;
        let { username, email, phone, password, image, imageFile } = req.body
        bcrpyt.hash(password, saltRounds, (err,hash) => {
            if (err) {
                console.log('masuk sini')
                res
                .status(500)
                .json({
                    msg: "failed to bcrypt",
                });
            } else {
                userModel.create({
                    username,
                    email,
                    phone,
                    image,
                    imageFile,
                    password: hash
                })
                .then((credentials => {
                    res
                    .status(201)
                    .json({
                        msg: "succesfully created user",
                        data: credentials
                    })
                }))
                .catch((err => {
                    console.log(err.message)
                    res
                    .status(400)
                    .json({
                        msg: "failed to register",
                        err
                    })
                }))
            }
        })
    }

    static signIn(req,res){
        let { username, password } = req.body
        userModel.findOne({ $or:[ {username}, {email: username} ] },(err,data)=>{
            // if (err) {
            //     res
            //     .status(500)
            //     .json(err)
            // }else{
                if(data !== null){
                    let { _id: id, email, phone, image, credits, isAdmin, imageFile  } = data
                    let hash = data.password 
                    bcrpyt.compare(req.body.password, hash, (err,same) => {
                            if (same) {
                                jwt.sign({
                                    id,
                                    username,
                                    email,
                                    phone,
                                    image,
                                    isAdmin,
                                    credits,
                                    imageFile
                                }, "secret", (err, token) => {
                                    // if (err) {
                                    //     res
                                    //     .status(500)
                                    //     .json(err)
                                    // } else {
                                        res
                                        .status(200)
                                        .json({
                                            token,
                                            id,
                                            isAdmin
                                        })
                                    
                                })
                            } else {
                                res
                                .status(401)
                                .json({
                                    msg: "wrong password"
                                })
                            }

                    })
                }else{
                    res
                    .status(401)
                    .json({
                        msg: "user does not exist"
                    })
                }
        })
    }

    static registerAdmin (req, res) {
        let saltRounds = 5;
        let { username, email, phone, password, image, imageFile } = req.body
        bcrpyt.hash(password, saltRounds, (err,hash) => {
            if (err) {
                res
                .status(500)
                .json({
                    msg: "failed to bcrypt",
                });
            } else {
                userModel.create({
                    username,
                    email,
                    phone,
                    image,
                    password: hash,
                    isAdmin: true,
                    imageFile
                })
                .then((credentials => {
                    res
                    .status(201)
                    .json({
                        msg: "succesfully created user",
                        data: credentials
                    })
                }))
                .catch((err => {
                    res
                    .status(400)
                    .json({
                        msg: "failed to register",
                        err
                    })
                }))
            }
        })
    }

    static topUp (req, res) {
        let { owner, amount } = req.body
        userModel.findByIdAndUpdate(owner, {
            $inc: { credits: amount }
        })
        .then((result => {
            res
            .status(201)
            .json({
                msg: "succesfully topped up credentials",
                data: result
            })
        }))
        .catch((err => {
            res
            .status(500)
            .json({
                msg: "error",
                err
            })
        }))
    }

}

module.exports = Controller