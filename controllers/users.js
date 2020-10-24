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
    if (req.session.currentUser)
        res.send('Please sign out before creating a new user');
    else
        res.render('users/new.ejs', {currentUser: req.session.currentUser});
});

//Post Method
usersRouter.post('/', (req, res) => {
    Users.find({username: `${req.body.username}`}, (err, results) => {
        if (results.length)
            res.send('Username already taken');
        else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            Users.create(req.body, (err, createdUser) => {
                if (err)
                    console.log(err);
                else {
                    console.log('user ', createdUser.username, ' created');
                    res.redirect('/sessions/login');
                }
            });
        }
    }).collation({locale: 'en', strength: 2});
});

module.exports = usersRouter;
