/**************************
**** Post Initializers ****
**************************/

//Initialize Express
const express = require('express');
const routerPosts = express.Router();

//Initialize Mongoose
const mongoose = require('mongoose');

//Import Post model
const Posts = require('../models/posts.js');

//Import seed data
const seed = require('../models/seed-posts.js');

//Import date date
const months = require('../models/months.js');
const days = require('../models/days.js');

//helper function to prove user Authenticity
const isSignedIn = (req, res, next) => {
    if (req.session.currentUser)
        return next();
    else
        res.redirect('/sessions/login');
};

/********************
**** Posts Paths ****
********************/

//Seed Path
routerPosts.get('/seed', (req, res) => {
    Posts.create(seed, (err, data) => {
        if (err)
            console.log(err);
        else
            console.log(data);
    });
    res.send(`Seed documents added to 'posts'`);
});

//Clear database path
routerPosts.get('/clear', (req, res) => {
    mongoose.connection.db.dropCollection('posts');
    Posts.countDocuments({}, (err, data) => {
        if (err)
            console.log(err);
        else 
            console.log(`There are ${data} documents in collection 'posts'`);
    });
    res.send("Database cleared");
});

//INDEX path for all posts
routerPosts.get('/', (req, res) => {
    Posts.find({}, (err, postsData) => {
        if (err)
            console.log(err);
        else {
            res.render('posts/index.ejs', {
                posts: postsData,
                currentUser: req.session.currentUser,
                days: days,
                months: months
            });
        }
    });
});

//INDEX path for maps
routerPosts.get('/map', (req, res) => {
    Posts.find({}, (err, postsData) => {
        if (err)
            console.log(err);
        else {
            res.render('posts/map.ejs', {
                posts: postsData,
                currentUser: req.session.currentUser,
                API_KEY: process.env.API_KEY
            });
        }
    });
});

//INDEX path for User
routerPosts.get('/user/:poster', (req, res) => {
    Posts.find({poster: req.params.poster}, (err, postsData) => {
        if (err)
            console.log(err);
        else {
            res.render('posts/user.ejs', {
                poster: req.params.poster,
                posts: postsData,
                currentUser: req.session.currentUser,
                days: days,
                months: months
            });
        }
    });
});

//NEW path
routerPosts.get('/new', isSignedIn, (req, res) => {
    res.render('posts/new.ejs', {
        currentUser: req.session.currentUser,
        API_KEY: process.env.API_KEY
    });
});

//POST method
routerPosts.post('/', (req, res) => {
    //Manually create default values for title and location if empty strings
    if (req.body.title === '')
        req.body.title = "Untitled";
    if (req.body.location === '')
        req.body.location = "Unlisted";
    //Append poster property to req.body
    req.body.poster = `${req.session.currentUser.username}`;
    Posts.create(req.body, (err, postData) => {
        if (err)
            console.log(err);
        else
            console.log(postData);
    });
    res.redirect('/catspotting');
});

//POST method for comments
routerPosts.post('/:id', (req, res) => {
    let newComment = {
        text: req.body.text,
        user: `${req.session.currentUser.username}`
    };
    Posts.findByIdAndUpdate(req.params.id, { $push: {comments: newComment} }, {new: true}, (err, postData) => {
        if (err)
            console.log(err);
        else
            console.log(`${postData.comments} has been updated`);
    });
    res.redirect(`/catspotting/${req.params.id}`);
});

//SHOW path
routerPosts.get('/:id', (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else {
            res.render('posts/show.ejs', {
                post: postData,
                currentUser: req.session.currentUser,
                API_KEY: process.env.API_KEY,
                days: days,
                months: months
            });
        }
    });
});

//EDIT path
routerPosts.get('/:id/edit', isSignedIn, (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else {
            if (postData.poster === req.session.currentUser.username) {
                res.render('posts/edit.ejs', {
                    post: postData,
                    currentUser: req.session.currentUser,
                    API_KEY: process.env.API_KEY
                });
            }
            else
                res.send('Unauthorized Access');
        }
    });
});

//PUT method
routerPosts.put('/:id', (req, res) => {
	Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, 
        (err, postData) => {
        if (err)
            console.log(err);
        else {
            console.log(`${postData} has been updated`);
            res.redirect(`/catspotting/${postData._id}`);
        }
    });
});

//DELETE method
routerPosts.delete('/:id', isSignedIn, (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else if (postData.poster === req.session.currentUser.username) {
            Posts.findByIdAndDelete(req.params.id, (err, postData) => {
                if (err)
                    console.log(err);
                else {
                    console.log(postData.title + " has been deleted");
                    res.redirect('/catspotting');
                }
            });
        }
        else {
            res.send('Unauthorized Access');
        }
    });
});

module.exports = routerPosts;
