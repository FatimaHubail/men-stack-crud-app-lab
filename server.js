const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Planet = require('./models/planet.js');
const morgan = require('morgan');

dotenv.config();
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// DB connection
const connect = async () => {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Connected to MongoDB');
}
connect();

// index route
app.get('/new', (req, res) => {
    res.render("index.ejs");
});

// 'add planet' form route
app.get('/planets/new', (req, res) => {
    res.render("planets/new.ejs");
});

// sending 'add planet' form
app.post('/planets', async (req, res) => {
    try {
        // process boolean data
        if (req.body.hasMagneticField === "on") {
            req.body.hasMagneticField = true;
        } else {
            req.body.hasMagneticField = false;
        }

        if (req.body.visitedByProbe === "on") {
            req.body.visitedByProbe = true;
        } else {
            req.body.visitedByProbe = false;
        }

        // process moons array
        if (req.body.moons) {
            req.body.moons = req.body.moons.split(',').map(moon => moon.trim());
        } else {
            req.body.moons = [];
        }

        // creating the planet
        await Planet.create(req.body);
        res.redirect("/planets/new");
    } catch (error) {
        console.log('error');
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
