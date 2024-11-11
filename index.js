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
        const savedBook = await book.save();
        return savedBook;
    } catch (error) {
        console.log(error)
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

        if(books){
            res.json(books)
        }else{
            res.status(404).json({error: 'No Books found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data.'})
    }
})



//Q4 - read books by title

async function readBookByTitle(bookTitle) {
    try {
        const book = await Book.find({title: bookTitle});

        return book;

    } catch (error) {
        throw error;
    }
}


app.get('/books/:title', async (req, res) => {
    try {
        const books = await readBookByTitle(req.params.title);

        if(books){
            res.json(books)
        }else{
            res.status(404).json({error: 'Book not found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch books.'})
    }

})


//Q5 - read books by author


async function readByAuthor(authorName) {
    try {
        const author = await Book.find({author: authorName});

        return author;

    } catch (error) {
        console.log(error);
    }
}


app.get('/books/author/:authorName', async (req, res) => {
    try {
        const books = await readByAuthor(req.params.authorName);

        if(books){
            res.json(books)
        }else{
            res.status(404).json({error: 'Book not nound.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch book.'})
    }
})


// Q6 - get books by Business genre;


async function readByGenre(genreName){
    try {
        const genre = await Book.find({genre: genreName});

        return genre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


app.get('/books/genre/:genreName', async(req, res) => {
    try {
        const genre = await readByGenre(req.params.genreName);

        if(genre){
            res.json(genre)
        }else{
            res.status(404).json({error: 'Book not found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch books.'})
    }
})


// books with publishYear 2012

async function readByYear(year){
    try {
        const book = await Book.find({publishedYear: year})
        return book;

    } catch (error) {
        console.log(error);
    }
}


app.get('/books/year/:year', async (req, res) => {
    try {
        const book = await readByYear(req.params.year);

        if(book){
            res.json(book);
        }else{
            res.status(404).json({error: 'Book not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch books.'})
    }
})



//Q8 - Updated book rating: { "rating": 4.5 }

async function updateBook(bookId, dataToupdate){
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, dataToupdate)

        return updatedBook;
    } catch (error) {
        console.log('Error in updating the book', error);
    }
}

app.post('/books/updated/:bookId', async (req, res) => {
    try {
        const updatedBook = await updateBook(req.params.bookId, req.body);

        if(updatedBook){
            res.status(200).json({message: 'Book updated successfully', updatedBook});
        }else{
            res.status(404).json({error: 'Book does not exists.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to update book.'})
    }
})


// Q9 - Updated book data: { "publishedYear": 2017, "rating": 4.2 }


async function updatedBookByTitle(bookTitle, dataToupdate){
    try {
        const updatedBook = await Book.findOneAndUpdate({title: bookTitle}, dataToupdate);

        return updatedBook;
    } catch (error) {
        console.log(error);
    }
}


app.post('/books/titleUpdate/:title', async (req, res) => {
    try {
        const updatedBook = await updatedBookByTitle(req.params.title, req.body);

        if(updatedBook){
            res.status(200).json({message: 'Book updated successfully.'})
        }else{
            res.status(404).json({error: 'Book does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch book to update.'})
    }
})



//Q10 - delete a book with the help of a book id


async function deleteBook(bookId) {

    try {
         const book = await Book.findByIdAndDelete(bookId);
        
        return book;

    } catch (error) {
        console.log(error);
    }
    
}


app.delete('/books/delBook/:bookId', async (req, res) => {
    try {
        const deletedBook = await deleteBook(req.params.bookId);

        if(deletedBook){
            res.status(200).json({message: 'Book deleted successfully.'})
        }else{
            res.status(404).json({error: 'Book not found.'})
        }
    
    } catch (error) {
        res.status(500).json({error: 'Failed to delete book.'})
    }   
})



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})