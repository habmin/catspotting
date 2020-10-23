/***************************
**** Users Initializers ****
***************************/

//Initialize express
const express = require('express');
const usersRouter = express.Router();

//Initialize mongoose
const mongoose = require('mongoose');

//Initialize bCrypt
const bcrypt = require('bcrypt');

//Import Users Schema
const Users = require('../models/users.js');

//Import seed data
const seed = require('../models/seed-users.js');

/********************
**** Users Paths ****
********************/

//Seed Path
usersRouter.get('/seed', (req, res) => {
    Users.create(seed, (err, data) => {
        if (err)
            console.log(err);
        else
            console.log(data);
    });
    res.send(`Seed documents added to 'users'`);
});

//Clear database path
usersRouter.get('/clear', (req, res) => {
    mongoose.connection.db.dropCollection('users');
    Users.countDocuments({}, (err, data) => {
        if (err)
            console.log(err);
        else 
            console.log(`There are ${data} documents in collection 'users'`);
    });
    res.send("Database cleared");
});

//NEW Path
usersRouter.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

//Post Method
usersRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    Users.create(req.body, (err, createdUser) => {
        if (err)
            console.log(err)
        else
            console.log('user is created', createdUser);
        res.redirect('/');
    });
});

module.exports = usersRouter;
