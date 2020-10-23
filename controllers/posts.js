/**************************
**** Post Initializers ****
**************************/

//Initialize Express
const express = require('express');
const router = express.Router();

//Initialize Mongoose
const mongoose = require('mongoose');

//Import Post model
const Posts = require('../models/posts.js');

//Import seed data
const seed = require('../models/seed.js');

/********************
**** Posts Paths ****
********************/

//Seed Path
router.get('/seed', (req, res) => {
    Posts.create(seed, (err, data) => {
        if (err)
            console.log(err);
        else
            console.log(data);
    });
    res.send("Seed documents added");
});

//Clear database path
router.get('/clear', (req, res) => {
    mongoose.connection.db.dropDatabase();
    Posts.countDocuments({}, (err, data) => {
        if (err)
            console.log(err);
        else 
            console.log(`There are ${data} documents in database`);
    });
    res.send("Database cleared");
});

//INDEX path
router.get('/', (req, res) => {
    Posts.find({}, (err, postsData) => {
        if (err)
            console.log(err);
        else
            res.render('posts/index.ejs', {posts: postsData});
    });
});

//NEW path
router.get('/new', (req, res) => {
    res.render('posts/new.ejs');
});

//POST method
router.post('/', (req, res) => {
    Posts.create(req.body, (err, postData) => {
        if (err)
            console.log(err);
        else
            console.log(postData);
    })
    res.redirect('/catspotting');
});

//SHOW path
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else
            res.render('posts/show.ejs', {post: postData});
    });
});

//EDIT path
router.get('/:id/edit', (req, res) => {
    Posts.findById(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else
            res.render('posts/edit.ejs', {post: postData});
    });
});

//PUT method
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Posts.findByIdAndDelete(req.params.id, (err, postData) => {
        if (err)
            console.log(err);
        else {
            console.log(postData.title + " has been deleted");
            res.redirect('/catspotting');
        }
    });
});

module.exports = router;
