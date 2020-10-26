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
    longitude: Number
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
