const express = require('express')
const router = express.Router()
const crewsController = require('../controllers/crewsController')

router.route('/')
    .get(crewsController.getAllCrews)
    .post(crewsController.createNewCrew)
    .delete(crewsController.deleteCrew)

module.exports = router