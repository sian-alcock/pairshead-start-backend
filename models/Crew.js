const mongoose = require('mongoose')

const crewSchema = new mongoose.Schema({
    crewId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
    },
    composite_code: {
        type: String,
    },
    clubId: {
        type: Number,
    },
    rowingCRI: {
        type: Number
    },
    scullingCRI: {
        type: Number
    },
    event: {
        type: Number
    },
    status: {
        type: String,
    },
    band: {
        type: Number
    }
},
{
    toObject: {virtuals: true},
    toJSON: { virtuals: true }
})

crewSchema.virtual('club', {
    ref: 'Club',
    localField: 'clubId',
    foreignField: 'clubId',
})

module.exports = mongoose.model('Crew', crewSchema)