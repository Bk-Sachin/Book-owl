const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const app = express();
const path = require('path');
dotenv.config();
app.use(cors());
connectDB();
const port = process.env.PORT;

app.use(express.json());

app.use('/books', require('./routes/books'));
app.use('/cart', require('./routes/cart'));
app.use('/auth', require('./routes/auth'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
});
