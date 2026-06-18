// server.js - Main Entry Point
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Configuration
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware Configuration
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static File Serving
app.use(express.static('public'));

// Temporary Storage Array (Task 2)
global.temporarySubmissions = [];

// Routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Error Middleware
const { errorHandler, notFound } = require('./middleware/error');
app.use(notFound);
app.use(errorHandler);

// Start Server Sequence
const startServer = async () => {
    // Connect to database
    await connectDB();

    // Connect to Redis
    await connectRedis();

    // Start cleanup background jobs
    require('./jobs/cleanup');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log('Cron Job Started');
    });
};

startServer();
