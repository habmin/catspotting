/*********************************
**** Cat Spotting Post Schema ****
*********************************/

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {type: String, default: "Untitled"},
	description: String,
    location: {type: String, default: "Unknown"},
    img: {type: String, required: true},
    poster: {type: String, default:"***ERROR***"}
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
