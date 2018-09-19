const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');

class Controller {
    
    static signUp(req,res){
        let saltRounds = 5;
        let { username, email, phone, password} = req.body
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
        let { username, email, password} = req.body
        userModel.findOne({ $or:[ {username}, {email} ] },(err,data)=>{
            if (err || data == null) {
                res
                .status(400)
                .json(err)
            }else{
                if(data !== null){
                    let { _id, email, phone, password } = data
                    let hash = password;
                    bcrpyt.compare(password, hash, (err,same) => {
                        if (same) {
                            jwt.sign({
                                _id,
                                username,
                                email,
                                phone
                            }, "secret", ( err,token) => {
                                if (err) {
                                    res
                                    .status(500)
                                    .json(err)
                                } else {
                                    res
                                    .json({
                                        token,
                                        _id
                                    })
                                }
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
            }
        })
    }

}

module.exports = Controller