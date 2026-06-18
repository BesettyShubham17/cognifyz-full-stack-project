// controllers/authController.js - Authentication Controller (Task 6)
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// POST /api/register
exports.registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Server-side validation (Task 2)
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with that email.' });
        }

        const user = await User.create({ name, email, password, phone: phone || '' });

        const token = generateToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: 'strict'
        });

        // Also store in temporary array (Task 2)
        global.temporarySubmissions.push({
            type: 'Registration',
            data: { name: user.name, email: user.email },
            timestamp: Date.now()
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            });
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/logout
exports.logoutUser = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};

// POST /api/forgot-password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with that email.' });
        }
        // In production, send a reset email here
        res.status(200).json({ message: 'Password reset instructions sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
