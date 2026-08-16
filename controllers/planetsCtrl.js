const Planet = require('../models/planet');

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
        console.log('failed to fetch the planet');
    }
};

// edit planet form route
const showEditForm = async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        res.render("planets/edit.ejs", { planet });
    } catch (error) {
        console.log(error);
        console.log('failed to fetch the planet');
    }
};

// edit planet data route
const edit = async (req, res) => {
    try {
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

        if (req.body.moons) {
            req.body.moons = req.body.moons.split(',').map(moon => moon.trim());
        } else {
            req.body.moons = [];
        }

        const planet = await Planet.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        res.redirect(`/planets/${planet._id}`);
    } catch (error) {
        console.log(error);
        console.log('failed to update the planet');
    }
};

// delete planet route
const deletePlanet = async (req, res) => {
    try {
        await Planet.findByIdAndDelete(req.params.id);
        res.redirect("/planets");
    } catch (error) {
        console.log(error);
        console.log('failed to delete the planet');
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



