const mongoose = require('mongoose')

const marshallingSchema = new mongoose.Schema(
    {
        division: {
            type: String,
            required: true,
        },
        bottomRange: {
            type: Number,
            required: true
        },
        topRange: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Marshalling', marshallingSchema)