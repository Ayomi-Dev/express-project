// importing the express module
const express = require('express');

// setting up middleware module
const morgan = require('morgan');

// importing mongoose
const mongoose = require('mongoose')

// importing model for a database collection
const Verse = require('../models/verses')


// setting up an express app
const app = express();

// importing file system module
const fs = require('fs');

// setting up database to store verses
const dbURI = "mongodb+srv://ayomideolakunlea1:nodeproject1234.@node-project.7gmk7.mongodb.net/verse-db?retryWrites=true&w=majority&appName=node-project"
mongoose.connect(dbURI)
.then(() => {
    console.log('connected to db')
    app.listen(3000)
})
.catch(err => console.log(err))

// registering view engine to serve up dynamic data to html template
app.set('view engine', 'ejs')

// setting up the path module for easy routing
const path = require('path');


// creating a custom middle to run just on the server

app.use(morgan('dev')); // creating a third-party middleware

app.use(express.urlencoded({extended: true})) // setting up middleware to grab form input values
app.use(express.json())  //allows express to send/receive json data


// routing using express

app.use(express.static('public')); // serve static files from a directory

app.set('views', path.join(__dirname, '../views')); // serve up dynamic files from a view directory






// creating routes
app.get('/', (req, res) => {
    res.redirect('/verses')
});

app.get('/verses', (req, res) => {
    Verse.find().sort({ createdAt: -1 }) //queries the db and returns all documents in the db collection from newest to oldest
    .then((result) => {
        res.render('index', {title: 'Home', verses: result})
    })
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'}) ;
}); 

// posting a request to a server to create a new document and add to a database
app.get('/verse/create', (req, res) => {

    res.render('create', {title: 'create a verse', message: null})
});

app.post('/verses', (req, res) => {
    const verse = new Verse( req.body ) //creates a new intance of the db collection model and sets the form input values as the new document key values

    verse.save() //saves the new created document to the db collection
    .then(result => {
        res.redirect('/'); //goes back to homepage to see the new document added
    })
    .catch(err => console.log(err));
    
});



// response for a specific or selected data
app.get('/verses/:id', (req, res) => {

    Verse.findById(req.params.id) //queries the db and returns a document that matches the id pased in
    .then(result => {
        const verse = result
        res.render('verse', {title: `${verse.chapter}:${verse.verse}`, verse})
    })
    .catch(err => console.log(err))
    
})

// updating an existing document in a database collection
app.get('/verses/:id/edit', (req, res) => {

    Verse.findById(req.params.id) //queries the db and returns a document that matches the id pased in
    .then(result => {
        const verse = result
        res.render('edit', {title: `${verse.chapter}:${verse.verse}`, verse})
    })
    .catch(err => console.log(err))
});

app.post('/verses/:id/edit', (req, res) => {
    const updatedDataId = req.params.id
    const updatedDocBody = req.body

    Verse.findByIdAndUpdate(updatedDataId, updatedDocBody, {new: true}) //cycles through the collection to returns doc that matches the id and updates new changes made 
    .then(result => {
        const verse = result
        res.render('verse', {title: `${verse.chapter}:${verse.verse}`, verse})
    })
    .catch(err => console.log(err))
    
})

// deleting data from a file
app.delete('/verses/:id', (req, res) => {
    Verse.findByIdAndDelete(req.params.id) //deletes a document that matches the id passed in
    .then(result => {
        res.json({redirect: '/', message: 'verse deleted'})
    })
    .catch(err => console.log(err))
})


// 404 page
app.use((req, res) => {
    res.status(404).sendFile('/404.html', {root: (path.join( __dirname, '../pages'))})

    // serving files using view engines
    res.status(404).render('404', {title: 'Error 404'})
})