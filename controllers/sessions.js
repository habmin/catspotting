/******************************
**** Sessions Initializers ****
*******************************/

//Initialize express
const express = require('express');

//Initialize express-sessions
const sessionsRouter = express.Router();

//Initialize bCrypt - used for crypting-decrypting passwords
const bcrypt = require('bcrypt');

//Import user schema model
const Users = require('../models/users.js')

/********************************
**** Sessions Path & Methods ****
********************************/

//NEW path (login)
sessionsRouter.get('/login', (req, res) => {
    res.render('sessions/new.ejs', {currentUser: req.session.currentUser});
});

//POST method for new path
sessionsRouter.post('/', (req, res) => {
    Users.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) 
            console.log(err);
        //If no user is found
        else if (!foundUser)
            res.send(`<p>No user found. Click <a href="/sessions/login">here</a> to try again or <a href="/users/new">make a new account</a></p>`);
        else {
            //If username and password is a match (successful login)
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/catspotting');
            }
            //If password does not match
            else
                res.send(`<p>Password do not match.<a href="/sessions/login">Try again.</a></p>`);
        }
    });
});

//DELETE method for user (logout)
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/catspotting');
    });
});

//Export router for server.js
module.exports = sessionsRouter;
