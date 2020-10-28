/***************************
**** Posts Initializers ****
***************************/

//Initialize Express
const express = require('express');
const routerPosts = express.Router();

//Initialize Mongoose
const mongoose = require('mongoose');

//Import Post schema model
const Posts = require('../models/posts.js');

//Import seed data
const seed = require('../models/seed-posts.js');

//Import data arrays
const months = require('../models/months.js');
const days = require('../models/days.js');

//helper function to prove a user is signed in
const isSignedIn = (req, res, next) => {
    if (req.session.currentUser)
        return next();
    else
        res.redirect('/sessions/login');
};

/******************************
**** Posts Paths & Methods ****
******************************/

//Seed Path - creates 5 sample posts
//admin privileges only
routerPosts.get('/seed', (req, res) => {
    if (req.session.currentUser !== "admin")
        res.send("Unauthorized access");
    else {
        Posts.create(seed, (err, data) => {
            if (err)
                console.log(err);
            else
                console.log(data);
        });
        res.send(`Seed documents added to 'posts'`);
    }
});

//Clear database path - clears all posts
//admin privileges only
routerPosts.get('/clear', (req, res) => {
    if (req.session.currentUser !== "admin")
        res.send("Unauthorized access");
    else {
        mongoose.connection.db.dropCollection('posts');
        Posts.countDocuments({}, (err, data) => {
            if (err)
                console.log(err);
            else 
                console.log(`There are ${data} documents in collection 'posts'`);
        });
        res.send("Database cleared");
    }
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

//INDEX path for User - shows posts only by a poster
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

//NEW path - creates a new post
//uses isSignedIn to verify a session has a current user
routerPosts.get('/new', isSignedIn, (req, res) => {
    res.render('posts/new.ejs', {
        currentUser: req.session.currentUser,
        API_KEY: process.env.API_KEY
    });
});

//POST method - used to post NEW post
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
    //Create object that matches schema
    let newComment = {
        text: req.body.text,
        user: `${req.session.currentUser.username}`
    };
    //Push new comment object into the post document's array
    Posts.findByIdAndUpdate(req.params.id, { $push: {comments: newComment} }, {new: true}, (err, postData) => {
        if (err)
            console.log(err);
        else
            console.log(`${postData.comments} has been updated`);
    });
    res.redirect(`/catspotting/${req.params.id}`);
});

//SHOW path - shows a single post with more description
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

//EDIT path - edit's a post properties
routerPosts.get('/:id/edit', isSignedIn, (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else {
            //verifies that current session user matches the post's author
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

//PUT method - used for edit path
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

//DELETE method - deletes a post
routerPosts.delete('/:id', isSignedIn, (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        //verifies that current session user matches the post's author
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

//Export router for server.js
module.exports = routerPosts;
