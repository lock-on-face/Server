const jwt = require('jsonwebtoken')

class Controller {

    static verifyUser (req, res, next) {
        let { token } = req.headers
        console.log('ini middleware',req.headers)
        if ( token ) {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    res
                    .status(403)
                    .json({
                        msg: "failed to decode",
                        err
                    })
                } else {
                    let { id } = decoded
                    req.body.owner = id
                    next()
                }
            })
        } else {
            res
            .status(403)
            .json({
                msg: "please sign in"
            })
        }
    }

    static verifyAdmin (req, res, next) {
        let { token } = req.headers
        if ( token ) {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    res
                    .status(403)
                    .json({
                        msg: "failed to decode",
                        err
                    })
                } else {
                    let { isAdmin } = decoded
                    if (isAdmin) {
                        next()
                    } else {
                        res
                        .status(403)
                        .json({
                            msg: "insufficient priviledged",
                            err
                        })
                    }
                }
            })
        } else {
            res
            .status(400)
            .json({
                msg: "please provide a token"
            })
        }
    }
    
}

module.exports = Controller