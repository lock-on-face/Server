const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

/* GET users listing. */
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

module.exports = router;
