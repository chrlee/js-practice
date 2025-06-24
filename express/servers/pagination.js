const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello" });
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
