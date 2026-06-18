// utils/generateToken.js - JWT Token Generator (Task 6)
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_key', {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
