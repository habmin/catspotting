/*********************************
**** Cat Spotting Post Schema ****
*********************************/

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: String,
	description: String,
    location: String,
    img: {type: String, required: true},
    poster: String,
    latitude: Number,
    longitude: Number,
    comments: [{
        text: {type: String, required: true},
        user: {type: String, required: true}
    }, {timestamps: true}]
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
