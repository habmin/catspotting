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
        res.redirect('sesssions/new');
}

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
    res.send(`Seed documents added tp 'posts'`);
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
        else
            res.render('posts/index.ejs', {posts: postsData});
    });
});

//NEW path
routerPosts.get('/new', (req, res) => {
    res.render('posts/new.ejs', {currentUser: req.session.currentUser});
});

//POST method
routerPosts.post('/', (req, res) => {
    Posts.create(req.body, (err, postData) => {
        postData.poster = req.session.currentUser;
        if (err)
            console.log(err);
        else 
            console.log(postData);
    })
    res.redirect('/catspotting');
});

//SHOW path
routerPosts.get('/:id', (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        console.log(req.session.currentUser);
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
routerPosts.get('/:id/edit', (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else
            res.render('posts/edit.ejs', {post: postData});
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
routerPosts.delete('/:id', (req, res) => {
    Posts.findByIdAndDelete(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else {
            console.log(postData.title + " has been deleted");
            res.redirect('/catspotting');
        }
    });
});

module.exports = routerPosts;
