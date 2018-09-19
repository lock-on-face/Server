const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const jwtmiddleware = require('../middleware/jwtVerify')

/* GET users listing. */
router.get('/', userController.getAll)
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.post('/admin', userController.registerAdmin )
router.put('/topup', jwtmiddleware.verifyUser, userController.topUp )

module.exports = router;
