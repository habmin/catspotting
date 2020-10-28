/***************************
**** Users Initializers ****
***************************/

//Initialize express
const express = require('express');
const usersRouter = express.Router();

//Initialize bCrypt
const bcrypt = require('bcrypt');

//Import Users Schema
const Users = require('../models/users.js');

/******************************
**** Users Paths & Methods ****
******************************/

//NEW Path - creates a new user
usersRouter.get('/new', (req, res) => {
    //Must be signed out before creating a new user
    if (req.session.currentUser)
        res.send('Please sign out before creating a new user');
    else
        res.render('users/new.ejs', {currentUser: req.session.currentUser});
});

//POST Method
usersRouter.post('/', (req, res) => {
    //does a case INsensitive search of user database to see if there are any matches
    //if there are any results, it is considered username is taken
    //Why did I do this? My logic is having that have the same name but display
    //differently would be annoying and confusing for users (Henry, henry, hEnry, henRY)
    //but thought users will still want to display their name specifically
    //(for those who like to make names like XoXoBaBExOxO)
    Users.find({username: `${req.body.username}`}, (err, results) => {
        if (err)
            console.log(err);
        else if (results.length)
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


//Export router for server.js
module.exports = usersRouter;
