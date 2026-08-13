const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: String,
    type: {
        type: String,
        enum: ['terrestrial', 'gas giant', 'ice giant', 'dwarf planet'],
    },
    diameter: Number,
    numOfMoons: Number,
    moons: {
        type: [String]
    },
    hasRings: Boolean,
    atmosphere: {
        type: String,
        enum: ['none', 'thin', 'thick', 'toxic'],
        rotationPeriod: Number,
        surfaceTemperature: Number,
        Composition: {
            type: String,
            enum: ['rock', 'gas', 'ice', 'metal']
        },
        discoveryYear: Number,
        discoveredBy: String,
        colorTheme: String
    }
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;