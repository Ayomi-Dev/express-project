const mongoose = require('mongoose')
const Schema = mongoose.Schema //a constructor function used to create instance of a document object


const verseSchema = new Schema({   //an object which defines the structure of the database document
    chapter: {
        type: String,
        required: true
    },
    verse: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

// settng up a model for the schema
const Verse = mongoose.model('Verse', verseSchema) //communicates with the database collection having the name specified e.g save, update etc..

module.exports = Verse;