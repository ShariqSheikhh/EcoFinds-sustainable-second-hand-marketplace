const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// This block gets all the items to display on the homepage
app.get("/api/items", (req, res) => {
    const sql = "SELECT * FROM items ORDER BY createdAt DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// This NEW block handles the data from your "List an Item" form
app.post("/api/items", (req, res) => {
    const { title, description, price, sellerId } = req.body;

    if (!title || !price || !sellerId) {
        return res.status(400).json({ "error": "Missing required fields" });
    }

    const sql = 'INSERT INTO items (title, description, price, sellerId) VALUES (?,?,?,?)';
    const params = [title, description, price, sellerId];

    db.run(sql, params, function(err, result) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.status(201).json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});


// This block starts the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});