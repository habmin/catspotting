/*********************
**** Initializers ****
*********************/

//Initialize express
const express = require('express');
const app = express();

//Reads .env file for PORT number
require('dotenv').config();
const port = process.env.PORT || 3000;

//Point to static assets
app.use(express.static('public'));

//Allows us to recognize JSON, strings, and array objects
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Initialize method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Initialize mongoose with mongoDB
const mongoURI = process.env.MONGODBURI;
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true    
});


//Initialize and use express-session
const session = require('express-session');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Import Post Controller
const postController = require('./controllers/posts.js');
app.use('/catspotting', postController);

//Import User Controller
const userController = require('./controllers/users.js');
app.use('/users', userController);

//Import Sessions Controller
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

/******************
**** LISTENERS ****
*******************/

//mongoose listeners
mongoose.connection.on('error', (err) => console.log("*** Error connecting to MongoDB ***"));
mongoose.connection.on('connected', () => console.log("*** MongoDB connected at " + mongoURI + " ***"));
mongoose.connection.on('disconnected', () => console.log("*** MongoDB disconnected at " + mongoURI + " ***"));

//express listener
app.listen(port, () => {
    console.log("*** Express server running at localhost:" + port + " ***");
});
