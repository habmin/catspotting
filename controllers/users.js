/***************************
**** Users Initializers ****
***************************/

//Initialize express
const express = require('express');
const usersRouter = express.Router();

//Initialize bCrypt
const bcrypt = require('bcrypt');

//Import Users Schema
const User = require('../models/users.js');

/********************
**** Users Paths ****
********************/

//NEW Path
usersRouter.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

//Post Method
usersRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        if (err)
            console.log(err)
        else
            console.log('user is created', createdUser);
        res.redirect('/');
    });
});

module.exports = usersRouter;
