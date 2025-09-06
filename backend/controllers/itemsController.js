// backend/controllers/itemsController.js
const db = require('../utils/db'); // Use the new centralized db utility

// Get all items
const getAllItems = async (req, res) => {
    try {
        const items = await db.query('SELECT * FROM items ORDER BY createdAt DESC');
        res.status(200).json({ message: "success", data: items });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Create a new item
const createItem = async (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    // Note: In a real app, sellerId would come from the authenticated user (req.user)
    const sellerId = 1; // Using a placeholder for now

    if (!title || !price) {
        return res.status(400).json({ message: "Title and price are required" });
    }

    try {
        const co2_saved = price * 0.5;
        const result = await db.run(
            'INSERT INTO items (title, description, price, sellerId, co2_saved, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, price, sellerId, co2_saved, imageUrl]
        );
        res.status(201).json({ message: "Item created successfully", data: { id: result.lastID } });
    } catch (err) {
        res.status(500).json({ message: "Failed to create item", error: err.message });
    }
};

module.exports = {
    getAllItems,
    createItem,
};