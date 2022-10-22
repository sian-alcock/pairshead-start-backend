const mongoose = require('mongoose')

const club = new mongoose.Schema({
    clubId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
    },
    abbreviation: {
        type: String,
    },
    indexCode: {
        type: String,
    },
    colours: {
        type: String
    },
    bladeImage: {
        type: String
    }
})

module.exports = mongoose.model('Club', club)