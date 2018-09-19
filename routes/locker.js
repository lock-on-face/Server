const express = require('express')
const router = express.Router()
const lockerController = require('../controller/lockerController')

router.post('/', lockerController.createLocker)
router.get('/', lockerController.getLocker)
router.get('/:id', lockerController.getOne)
router.put('/', lockerController.updateLocker)
router.delete('/', lockerController.delleteLocker)

module.exports = router