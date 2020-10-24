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

//INDEX path
routerPosts.get('/', (req, res) => {
    Posts.find({}, (err, postsData) => {
        if (err)
            console.log(err);
        else {
            res.render('posts/index.ejs', {
                posts: postsData,
                currentUser: req.session.currentUser
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
    Posts.create(req.body, (err, postData) => {
        if (err)
            console.log(err);
        else {
            Posts.findByIdAndUpdate(postData._id, {
                poster: `${req.session.currentUser.username}`
            }, (err, editedPostData) => {
                if (err)
                    console.log(err);
                else
                    console.log(editedPostData);
            });
        }
    });
    res.redirect('/catspotting');
});

//SHOW path
routerPosts.get('/:id', (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else {
            res.render('posts/show.ejs', {
                post: postData,
                currentUser: req.session.currentUser
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
                    currentUser: req.session.currentUser
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
