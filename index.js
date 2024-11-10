const express = require('express');

const app = express();


const {initializeDatabase} = require('./db/db.connect');

const Book = require('./models/books.models');

//added middleware

app.use(express.json());

initializeDatabase();


app.get('/', (req, res) => {
    res.send('Welcome to MyBooks App.')
})



//Q1


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


//Q3

async function readAllBooks(){
    try {
        const allBooks = await Book.find();
        return allBooks;

    } catch (error) {
        console.log(error);
    }
}


app.get('/allbooks', async(req, res) => {
    try {
        const books = await readAllBooks();

        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: 'No Books found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data.'})
    }
})



//Q4 -read books by title

async function readBookByTitle(bookTitle) {
    try {
        const book = await Book.findOne({title: bookTitle});

        return title;

    } catch (error) {
        throw error;
    }
}


app.get('/books/:title', async (req, res) => {
    try {
        const books = readBookByTitle(req.params.title);

        if(books.length != 0){
            res.json(books)
        }else{
            res.json({error: 'Book bot found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch books.'})
    }

})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})