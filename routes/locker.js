const express = require('express')
const router = express.Router()
const lockerController = require('../controller/lockerController')
const jwtmiddleware = require('../middleware/jwtVerify')
const {lockSystem} = require('../fire')

router.post('/', jwtmiddleware.verifyUser, lockerController.createLocker)
router.post('/firebase',jwtmiddleware.verifyUser, lockSystem)
router.get('/', lockerController.getLocker)
router.get('/self', jwtmiddleware.verifyUser, lockerController.getOne)
router.put('/:id', jwtmiddleware.verifyUser,lockerController.updateLocker)
router.delete('/:id', jwtmiddleware.verifyAdmin, lockerController.deleteLocker)

module.exports = router