// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body; // <-- This line is now fixed

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    try {
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully.", userId: result.id });

    } catch (err) {
        res.status(500).json({ message: "Server error during registration.", error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }

    try {
        const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful.",
            token: token,
            user: { id: user.id, username: user.username }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error during login.", error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};