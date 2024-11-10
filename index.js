const express = require('express');

const app = express();


const {initializeDatabase} = require('./db/db.connect');

const Book = require('./models/books.models');

//added middleware

app.use(express.json());

initializeDatabase();


async function createBook(newBook) {
    try {
        const book = new Book(newBook);
        await book.save();

    } catch (error) {
        throw error;
    }
}



app.post('/books', async(req, res) => {
    try {
        const savedBook = await createBook(req.body);
        res.status(201).json({message: 'Book added successfully.', book: savedBook});
    } catch (error) {
        res.status(500).json({error: 'Failed to add book.'})
    }
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})