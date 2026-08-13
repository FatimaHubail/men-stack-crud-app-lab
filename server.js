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
app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
