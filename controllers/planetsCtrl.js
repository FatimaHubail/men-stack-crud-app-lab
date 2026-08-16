const Planet = require('../models/planet');

// process boolean and moons fields of the create/edit forms
const processPlanetBody = (body) => {
     // process boolean data
    if (body.hasMagneticField === "on") {
        body.hasMagneticField = true;
    } else {
        body.hasMagneticField = false;
    }

    if (body.visitedByProbe === "on") {
        body.visitedByProbe = true;
    } else {
        body.visitedByProbe = false;
    }

    // process moons array
    if (body.moons) {
        body.moons = body.moons.split(',').map(moon => moon.trim()).filter(moon => moon !== "");
    } else {
        body.moons = [];
    }

    return body;
};

// home route
const home = async (req, res) => {
    res.render("index.ejs");
}

// 'add planet' form route
const showAddForm = (req, res) => {
    res.render("planets/new.ejs");
};

// sending 'add planet' form
const create = async (req, res) => {
    try {
        const planetData = processPlanetBody(req.body);

        // creating the planet
        const newPlanet = await Planet.create(planetData);
        res.redirect(`/planets/${newPlanet._id}`);
    } catch (error) {
        console.log(error);
        res.send('Failed to create planet.');
    }
};

// route to display all planets 
const allPlanets = async (req, res) => {
    try {
        const foundPlanets = await Planet.find();
        res.render("planets/allPlanets.ejs", { planets: foundPlanets });
    } catch (error) {
        console.log(error);
        res.send('failed to get planets');
    }
}

// show one planet data route
const show = async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        res.render("planets/showPlanet.ejs", { planet });
    } catch (error) {
        console.log(error);
        res.send('failed to fetch the planet');
    }
};

// edit planet form route
const showEditForm = async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        res.render("planets/edit.ejs", { planet });
    } catch (error) {
        console.log(error);
        res.send('failed to fetch the planet');
    }
};

// edit planet data route
const edit = async (req, res) => {
    try {
        const planetData = processPlanetBody(req.body);
        const planet = await Planet.findByIdAndUpdate(req.params.id, planetData);
        res.redirect(`/planets/${planet._id}`);
    } catch (error) {
        console.log(error);
        res.send('failed to update the planet');
    }
};

// delete planet route
const deletePlanet = async (req, res) => {
    try {
        await Planet.findByIdAndDelete(req.params.id);
        res.redirect("/planets");
    } catch (error) {
        console.log(error);
        res.send('failed to delete the planet');
    }
};

module.exports = {
    home,
    showAddForm,
    create,
    allPlanets,
    show,
    showEditForm,
    edit,
    deletePlanet
};



