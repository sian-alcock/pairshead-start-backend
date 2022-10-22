const Club = require('../models/Club')
const asyncHandler = require('express-async-handler')
const { restart } = require('nodemon')
const { response } = require('express')

// @desc Get all clubs
// @route GET /clubs
// @access Private

const getAllClubs = asyncHandler(async (req, res) => {
    const clubs = await Club.find().lean()
    if(!clubs.length) {
        return res.status(400).json({ message: 'No clubs found'})
    }
    res.json(clubs)
})

// @desc Create new club
// @route POST /clubs
// @access Private

const createNewClub = asyncHandler(async (req, res) => {
    const { clubId, name, indexCode, abbreviation, bladeImage } = req.body

    // Confirm data
    if(!clubId || !name) {
        return res.status(400).json({ message: 'Club Id and name are required.'})
    }

    // Check for duplicates
    const duplicate = await Club.findOne({ clubId }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate clubId'})
    }

    const clubObject = { clubId, name, indexCode, abbreviation, bladeImage}

    // Create and store new club

    const club = await Club.create(clubObject)

    if (club) {
        res.status(201).json({ message: `New club ${clubId} created.`})
    } else {
        res.status(400).json({ message: 'Invalid club data received.'})
    }
})

module.exports = {
    getAllClubs,
    createNewClub,
}
