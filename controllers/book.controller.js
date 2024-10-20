const pool = require('../database');

const getAllBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books'); // Query the books table
        res.json({
            data: result.rows, // Return the queried data as JSON
        });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({
            error: 'An error occurred while fetching books',
        });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params; // Get book_id from route parameters

    try {
        const sql = 'SELECT * FROM books WHERE book_id = $1';
        const { rows } = await pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({
            data: rows[0], // Return the found book
        });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'An error occurred while fetching the book' });
    }
};


const createBook = async (req, res) => {
    const { title, author, genre, published_date, price, stock_quantity } = req.body;

    try {
            const sql = `INSERT INTO books (title, author, genre, published_date, price, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
            const { rows } = await pool.query(sql, [title, author, genre, published_date, price, stock_quantity] )

        res.status(201).json({
            message: 'Book created successfully',
            data: rows[0], 
        });
    } catch (err) {
        console.error('Error inserting book', err.stack);
        res.status(500).json({
            error: 'An error occurred while creating the book',
        });
    }
};

// Update a book by ID
const updateBook = async (req, res) => {
    const { id } = req.params; // Get book_id from route parameters
    const { title, author, genre, published_date, price, stock_quantity } = req.body;

    try {
        const sql = `UPDATE books SET title = $1, author = $2, genre = $3, published_date = $4, 
                     price = $5, stock_quantity = $6 WHERE book_id = $7 RETURNING *`;
        const { rows } = await pool.query(sql, [title, author, genre, published_date, price, stock_quantity, id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({
            message: 'Book updated successfully',
            data: rows[0],
        });
    } catch (err) {
        console.error('Error updating book', err.stack);
        res.status(500).json({ error: 'An error occurred while updating the book' });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    const { id } = req.params; // Get book_id from route parameters

    try {
        const sql = `DELETE FROM books WHERE book_id = $1 RETURNING *`;
        const { rows } = await pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({
            message: 'Book deleted successfully',
            data: rows[0],
        });
    } catch (err) {
        console.error('Error deleting book', err.stack);
        res.status(500).json({ error: 'An error occurred while deleting the book' });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};