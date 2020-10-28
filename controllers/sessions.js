/******************************
**** Sessions Initializers ****
*******************************/

const express = require('express')
const sessionsRouter = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt');

//NEW path (login)
sessionsRouter.get('/login', (req, res) => {
    res.render('sessions/new.ejs', {currentUser: req.session.currentUser});
});

sessionsRouter.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) 
            console.log(err);
        else if (!foundUser)
            res.send(`<p>No user found. Click <a href="/sessions/login">here</a> to try again or <a href="/users/new">make a new account</a></p>`);
        else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/catspotting');
            }
            else
                res.send(`<p>Password do not match.<a href="/sessions/login">Try again.</a></p>`);
        }
    });
});

sessionsRouter.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/catspotting');
  });
});

module.exports = sessionsRouter;
