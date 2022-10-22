const Crew = require('../models/Crew')
const Club = require('../models/Club')
const asyncHandler = require('express-async-handler')
const { restart } = require('nodemon')
const { response } = require('express')

// @desc Get all crews
// @route GET /crews
// @access Private

const getAllCrews = asyncHandler(async (req, res) => {
    const crews = await Crew.find().lean()
    if(!crews.length) {
        return res.status(400).json({ message: 'No crews found'})
    }
    res.json(crews)
})

// @desc Create new crew
// @route POST /crews
// @access Private

const createNewCrew = asyncHandler(async (req, res) => {
    const { crewId, name, clubId, event, status, } = req.body

    // Confirm data
    if(!crewId || !clubId || !name) {
        return res.status(400).json({ message: 'Club Id and name are required.'})
    }

    // Check for duplicates
    const duplicate = await Crew.findOne({ crewId }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate crewId'})
    }

    const crewObject = { crewId, clubId, name, event, status}

    // Create and store new club

    const crew = await Crew.create(crewObject)

    if (crew) {
        res.status(201).json({ message: `New crew ${crewId} created.`})
    } else {
        res.status(400).json({ message: 'Invalid crew data received.'})
    }
})

// @desc Delete a crew
// @route DELETE /crews
// @access Private

const deleteCrew = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'Crew ID required.'})
    }

    const crew = await Crew.findById(id).exec()

    if(!crew) {
        return res.status(400).json({ message: 'Crew not found'})
    }

    const result = await crew.deleteOne()

    const reply = `Crew ${result.name} with ID ${result._id} deleted.`

    res.json(reply)
})

module.exports = {
    getAllCrews,
    createNewCrew,
    deleteCrew,
}
