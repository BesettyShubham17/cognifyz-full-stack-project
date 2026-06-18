// middleware/error.js - Error Handling Middleware (Task 7/8)

// 404 Not Found
const notFound = (req, res, next) => {
    // For API routes, return JSON
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
    }
    // For page routes, render 404 view
    res.status(404).render('404', { title: 'Page Not Found', user: res.locals.user || null });
};

// 500 Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error('Server Error:', err.message);

    if (req.originalUrl.startsWith('/api')) {
        return res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }

    res.status(statusCode).render('500', {
        title: 'Server Error',
        message: err.message,
        user: res.locals.user || null
    });
};

module.exports = { notFound, errorHandler };
