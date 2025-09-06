const jwt = require('jsonwebtoken');
const { getOne } = require('../utils/db');

// Middleware to verify JWT token
authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await getOne('SELECT id, username, email FROM users WHERE id = ?', [decoded.userId]);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await getOne('SELECT is_admin FROM users WHERE id = ?', [req.user.id]);
    if (!user || !user.is_admin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to check if user is the owner of a resource
const isOwner = (tableName) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await getOne(`SELECT user_id FROM ${tableName} WHERE id = ?`, [id]);
      
      if (!item) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      
      if (item.user_id !== req.user.id && !req.user.is_admin) {
        return res.status(403).json({ message: 'Not authorized to access this resource' });
      }
      
      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = {
  authenticate,
  isAdmin,
  isOwner,
};
