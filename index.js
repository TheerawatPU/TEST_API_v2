const express = require('express')
const { Pool } = require('pg')
const app = express()
require('dotenv').config();

const PORT = process.env.PORT;


const bookRoutes = require('./routes/book.router');
app.use(express.json());
app.use(bookRoutes);

app.listen(PORT, ()=> {
    console.log('server in running port 🚀⚡ ' + PORT)
})