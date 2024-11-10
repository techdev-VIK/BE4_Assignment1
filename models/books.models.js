const mongoose = require('mongoose');

//create schema

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    publushYear: {
        type: Number,
        require: true,
    },
    genre: [
        {
            type: String,
            enum: ['Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', 'Autobiography', 'Self-help', 'Business', 'Other']
        }
    ],
    language: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        default: 'United States'
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    summary: {
        type: String,
    },
    coverImageUrl: {
        type: String
    }
}, {
    timestamps: true
})


// create model


const Books = mongoose.model('Books', bookSchema);

module.exports = Books;