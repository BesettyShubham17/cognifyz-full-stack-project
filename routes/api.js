// routes/api.js - API Routes (Tasks 5, 6, 7, 8)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const formController = require('../controllers/formController');
const { protectAPI } = require('../middleware/auth');
const cacheMiddleware = require('../middleware/cache');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

// Task 7: Rate Limiting (10 requests per minute)
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: { message: 'Too many requests from this IP, please try again after a minute.' }
});

// === Auth Routes (Task 6) ===
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.post('/forgot-password', authController.forgotPassword);

// === Form Routes (Task 1/2) ===
router.post('/contact', formController.submitContact);
router.post('/apply', formController.submitApplication);

// === User CRUD Routes (Task 5) - Protected ===
router.get('/users', protectAPI, cacheMiddleware, userController.getUsers);
router.get('/users/:id', protectAPI, userController.getUserById);
router.post('/users', protectAPI, authController.registerUser);
router.put('/users/:id', protectAPI, userController.updateUser);
router.delete('/users/:id', protectAPI, userController.deleteUser);

// === GitHub API Route (Task 7) - Rate Limited ===
router.get('/github/:username', apiLimiter, async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.github.com/users/${req.params.username}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' },
            timeout: 5000
        });

        // Fetch repos separately
        let repos = [];
        try {
            const repoRes = await axios.get(`https://api.github.com/users/${req.params.username}/repos?per_page=6&sort=updated`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' },
                timeout: 5000
            });
            repos = repoRes.data.map(r => ({
                name: r.name,
                description: r.description || 'No description',
                stars: r.stargazers_count,
                language: r.language || 'N/A',
                html_url: r.html_url
            }));
        } catch (e) { /* ignore repo fetch errors */ }

        res.json({
            login: data.login,
            name: data.name,
            avatar_url: data.avatar_url,
            bio: data.bio,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            html_url: data.html_url,
            repos
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'GitHub user not found.' });
        } else if (error.response && error.response.status === 403) {
            res.status(429).json({ message: 'GitHub API rate limit exceeded. Please try again later.' });
        } else {
            res.status(500).json({ message: 'Failed to fetch GitHub data.' });
        }
    }
});

// Redis connection check endpoint
router.get('/redis-status', (req, res) => {
    const { isRedisConnected } = require('../config/redis');
    res.json({ connected: isRedisConnected() });
});

module.exports = router;
