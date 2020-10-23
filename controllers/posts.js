/*********************
**** Initializers ****
*********************/

//Initialize Express
const express = require('express');
const router = express.Router();

//Initialize Mongoose
const mongoose = require('mongoose');

//Import Post model
const Posts = require('../models/posts.js');

//Import seed data
const seed = require('../models/seed.js');

/**************
**** PATHS ****
**************/

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
            res.render('index.ejs', {posts: postsData});
    });
});

// //NEW path
// router.get('/new', (req, res) => {
//     res.render('store/new.ejs');
// });

// //SHOW path
// router.get('/:id', (req, res) => {
//     Products.findById(req.params.id, (err, itemData) => {
//         if (err)
//             console.log(err);
//         else
//             res.render('store/show.ejs', {item: itemData});
//     });
// });

// //POST method
// router.post('/', (req, res) => {
//     Products.create(req.body, (err, itemData) => {
//         if (err)
//             console.log(err);
//         else
//             console.log(itemData);
//     })
//     res.redirect('/store');
// });

// //EDIT path
// router.get('/:id/edit', (req, res) => {
//     Products.findById(req.params.id, (err, itemData) => {
//         if (err)
//             console.log(err);
//         else
//             res.render('store/edit.ejs', {item: itemData});
//     });
// });

// //PUT method
// router.put('/:id', (req, res) => {
// 	Products.findByIdAndUpdate(req.params.id, req.body, {new: true}, 
//         (err, itemData) => {
//         if (err)
//             console.log(err);
//         else {
//             console.log(`${itemData} has been updated`);
//             res.redirect(`/store/${itemData._id}`);
//         }
//     });
// });

// //DELETE method
// router.delete('/:id', (req, res) => {
//     Products.findByIdAndDelete(req.params.id, (err, itemData) => {
//         if (err)
//             console.log(err);
//         else {
//             console.log(itemData.name + " has been deleted");
//             res.redirect('/store');
//         }
//     });
// });

// //BUY Method Path
// router.put('/:id/:num', (req, res) => {
//     Products.findByIdAndUpdate(req.params.id, {qty: req.params.num}, {new: true}, 
//         (err, itemData) => {
//         if (err)
//             console.log(err);
//         else {
//             console.log(`${itemData} has been updated`);
//             res.redirect(`/store`);
//         }
//     });
// });

module.exports = router;
