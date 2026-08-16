const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const override = require('method-override');
const planetsCtrl = require('./controllers/planetsCtrl.js');

dotenv.config();
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(override('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
const connect = async () => {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Connected to MongoDB');
}
connect();

// routes
app.get('/', planetsCtrl.home);
app.get('/planets/new', planetsCtrl.showAddForm);
app.post('/planets', planetsCtrl.create);
app.get('/planets', planetsCtrl.allPlanets);
app.get('/planets/:id', planetsCtrl.show);
app.get('/planets/:id/edit', planetsCtrl.showEditForm);
app.put('/planets/:id', planetsCtrl.edit);
app.delete('/planets/:id', planetsCtrl.deletePlanet);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
