/******************************
**** Sessions Initializers ****
*******************************/

const express = require('express')
const sessionsRouter = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt');

//NEW path (login)
sessionsRouter.get('/login', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
});

sessionsRouter.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) 
            console.log(err);
        else if (!foundUser) {
            res.send('<a href="/">Sorry, no user found </a>');
        } 
        else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/catspotting');
            }
            else
                res.send("password do not match");
        }
    });
});

sessionsRouter.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/catspotting');
  });
});

module.exports = sessionsRouter;
