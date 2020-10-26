/*********************************
**** Cat Spotting Post Schema ****
*********************************/

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {type: String, default: "Untitled"},
	description: String,
    location: {type: String, default: "Unlisted"},
    img: {type: String, required: true},
    poster: {type: String, default:"***ERROR***"},
    latitude: {type: Number, default: undefined},
    longitude: {type: Number, default: undefined}
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
