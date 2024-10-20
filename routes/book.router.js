const express = require('express');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/book.controller');

const router = express.Router();

// Route to get all books
router.get("/app/v1/books", getAllBooks);

// Route to get a specific book by ID
router.get("/app/v1/books/:id", getBookById);

// Route to create a new book
router.post("/app/v1/books", createBook);

// Route to update a book by ID
router.put("/app/v1/books/:id", updateBook);

// Route to delete a book by ID
router.delete("/app/v1/books/:id", deleteBook);

module.exports = router;