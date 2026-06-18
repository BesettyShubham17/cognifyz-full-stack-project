// routes/index.js - View Routes (Task 1/3)
const express = require('express');
const router = express.Router();
const { protect, checkUser } = require('../middleware/auth');

// Apply checkUser to all routes (populates res.locals.user for navbar)
router.use(checkUser);

// Public pages
router.get('/', (req, res) => res.render('home', { title: 'Home' }));
router.get('/about', (req, res) => res.render('about', { title: 'About' }));
router.get('/tasks', (req, res) => res.render('tasks', { title: 'Tasks Roadmap' }));
router.get('/contact', (req, res) => res.render('contact', { title: 'Contact Us' }));

router.get('/login', (req, res) => {
    if (res.locals.user) return res.redirect('/dashboard');
    res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
    if (res.locals.user) return res.redirect('/dashboard');
    res.render('register', { title: 'Register' });
});

router.get('/forgot-password', (req, res) => {
    if (res.locals.user) return res.redirect('/dashboard');
    res.render('forgot-password', { title: 'Forgot Password' });
});

// Protected pages (Task 6 - only logged-in users)
router.get('/dashboard', protect, (req, res) => res.render('dashboard', { title: 'Dashboard' }));
router.get('/profile', protect, (req, res) => res.render('profile', { title: 'Profile' }));
router.get('/settings', protect, (req, res) => res.render('settings', { title: 'Settings' }));

router.get('/404', (req, res) => res.status(404).render('404', { title: 'Page Not Found' }));
router.get('/500', (req, res) => res.status(500).render('500', { title: 'Server Error', message: 'Manual trigger' }));

module.exports = router;
