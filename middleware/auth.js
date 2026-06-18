// middleware/auth.js - JWT Authentication Middleware (Task 6)
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - redirect unauthorized users to login
const protect = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            res.cookie('jwt', '', { maxAge: 1 });
            return res.redirect('/login');
        }
        res.locals.user = req.user;
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        res.cookie('jwt', '', { maxAge: 1 });
        return res.redirect('/login');
    }
};

// Check user on every request (non-blocking for public pages)
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
            const user = await User.findById(decoded.id).select('-password');
            res.locals.user = user || null;
        } catch (error) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
};

// Protect API routes - return JSON instead of redirect
const protectAPI = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        res.locals.user = req.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect, checkUser, protectAPI };
