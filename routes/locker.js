const express = require('express')
const router = express.Router()
const lockerController = require('../controller/lockerController')
const jwtmiddleware = require('../middleware/jwtVerify')

router.post('/', jwtmiddleware.verifyUser, lockerController.createLocker)
router.get('/', lockerController.getLocker)
router.get('/self', jwtmiddleware.verifyUser, lockerController.getOne)
router.put('/:id', jwtmiddleware.verifyUser,lockerController.updateLocker)
router.delete('/:id', jwtmiddleware.verifyAdmin, lockerController.deleteLocker)

module.exports = router