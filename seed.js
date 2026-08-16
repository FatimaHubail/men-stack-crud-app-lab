require('dotenv').config();
const mongoose = require('mongoose');
const Planet = require('./models/planet');

const planets = [
    {
      name: "Mercury",
      composition: "rock",
      diameter: 4879, // km
      distanceFromSun: 57.9, // million km
      rotationPeriod: 1407.6, // Earth hours (~58.6 Earth days)
      surfaceTemperature: 167, // °C average
      numOfMoons: 0,
      moons: [],
      hasMagneticField: true,
      atmosphere: "none",
      discoveryYear: null, // known since antiquity
      discoveredBy: "Known since antiquity",
      visitedByProbe: true // Mariner 10, MESSENGER, BepiColombo
    },
    {
      name: "Venus",
      composition: "rock",
      diameter: 12104,
      distanceFromSun: 108.2,
      rotationPeriod: -5832.5, // negative = retrograde rotation
      surfaceTemperature: 464,
      numOfMoons: 0,
      moons: [],
      hasMagneticField: false,
      atmosphere: "thick",
      discoveryYear: null,
      discoveredBy: "Known since antiquity",
      visitedByProbe: true // Venera, Magellan, etc.
    },
    {
      name: "Earth",
      composition: "rock",
      diameter: 12742,
      distanceFromSun: 149.6,
      rotationPeriod: 23.9,
      surfaceTemperature: 15,
      numOfMoons: 1,
      moons: ["Moon"],
      hasMagneticField: true,
      atmosphere: "thick",
      discoveryYear: null,
      discoveredBy: "N/A",
      visitedByProbe: true
    },
    {
      name: "Mars",
      composition: "rock",
      diameter: 6779,
      distanceFromSun: 227.9,
      rotationPeriod: 24.6,
      surfaceTemperature: -65,
      numOfMoons: 2,
      moons: ["Phobos", "Deimos"],
      hasMagneticField: false,
      atmosphere: "thin",
      discoveryYear: null,
      discoveredBy: "Known since antiquity",
      visitedByProbe: true // Viking, Curiosity, Perseverance, etc.
    },
    {
      name: "Jupiter",
      composition: "gas",
      diameter: 139820,
      distanceFromSun: 778.5,
      rotationPeriod: 9.9,
      surfaceTemperature: -110,
      numOfMoons: 115,
      moons: ["Io", "Europa", "Ganymede", "Callisto"], // Galilean moons; full count is 115+
      hasMagneticField: true,
      atmosphere: "thick",
      discoveryYear: null,
      discoveredBy: "Known since antiquity",
      visitedByProbe: true // Pioneer, Voyager, Galileo, Juno
    },
    {
      name: "Saturn",
      composition: "gas",
      diameter: 116460,
      distanceFromSun: 1434,
      rotationPeriod: 10.7,
      surfaceTemperature: -140,
      numOfMoons: 292,
      moons: ["Titan", "Enceladus", "Mimas", "Rhea", "Iapetus"], // largest/most notable; full count is 292+
      hasMagneticField: true,
      atmosphere: "thick",
      discoveryYear: null,
      discoveredBy: "Known since antiquity",
      visitedByProbe: true // Pioneer 11, Voyager, Cassini
    },
    {
      name: "Uranus",
      composition: "ice",
      diameter: 50724,
      distanceFromSun: 2871,
      rotationPeriod: -17.2, // retrograde
      surfaceTemperature: -195,
      numOfMoons: 29,
      moons: ["Titania", "Oberon", "Umbriel", "Ariel", "Miranda"],
      hasMagneticField: true,
      atmosphere: "thick",
      discoveryYear: 1781,
      discoveredBy: "William Herschel",
      visitedByProbe: true // Voyager 2 flyby only
    },
    {
      name: "Neptune",
      composition: "ice",
      diameter: 49244,
      distanceFromSun: 4495,
      rotationPeriod: 16.1,
      surfaceTemperature: -200,
      numOfMoons: 16,
      moons: ["Triton", "Nereid", "Proteus"],
      hasMagneticField: true,
      atmosphere: "thick",
      discoveryYear: 1846,
      discoveredBy: "Urbain Le Verrier, Johann Galle",
      visitedByProbe: true // Voyager 2 flyby only
    }
  ];

const seed = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to MongoDB');

        await Planet.deleteMany({}); // optional: clears existing planets first
        await Planet.create(planets);
        console.log('Seeded 8 planets successfully');
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
};

seed();