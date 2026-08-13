const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: String,
    Composition: {
        type: String,
        enum: ['rock', 'gas', 'ice', 'metal']
    },
    diameter: Number,
    distanceFromSun: Number,
    rotationPeriod: Number,
    surfaceTemperature: Number,
    numOfMoons: Number,
    moons: {
        type: [String]
    },
    hasMagneticField: Boolean,
    atmosphere: {
        type: String,
        enum: ['none', 'thin', 'thick', 'toxic'],
    },
    discoveryYear: Number,
    discoveredBy: String,
    visitedByProbe: Boolean,
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;