const express = require('express')
const router = express.Router()
const notificationController = require('../controller/notificationsController')
const jwtmiddleware = require('../middleware/jwtVerify')


router.post('/', jwtmiddleware.verifyUser, notificationController.create )
router.get('/', jwtmiddleware.verifyUser, notificationController.read )
router.delete('/:id', jwtmiddleware.verifyUser, notificationController.delete )

module.exports = router