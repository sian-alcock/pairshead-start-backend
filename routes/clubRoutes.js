const express = require('express')
const router = express.Router()
const clubsController = require('../controllers/clubsController')

router.route('/')
    .get(clubsController.getAllClubs)
    .post(clubsController.createNewClub)

module.exports = router