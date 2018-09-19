const jwt = require('jsonwebtoken')

class Controller {

    static verifyUser (req, res, next) {
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
                    let { _id } = decoded
                    req.body.owner = _id
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
    
}

module.exports = Controller