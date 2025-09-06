// backend/routes/items.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
// Optional: Add auth middleware later to protect routes
// const authMiddleware = require('../middleware/auth');

router.get('/', itemsController.getAllItems);
router.post('/', itemsController.createItem); // We can protect this later with authMiddleware

module.exports = router;