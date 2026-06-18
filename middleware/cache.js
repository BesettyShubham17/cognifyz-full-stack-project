// middleware/cache.js - Redis Cache Middleware
const { getRedisClient, isRedisConnected } = require('../config/redis');

const cacheMiddleware = async (req, res, next) => {
    if (!isRedisConnected()) return next();

    const client = getRedisClient();
    const key = `cache:${req.originalUrl}`;

    try {
        const data = await client.get(key);
        if (data) {
            console.log(`Cache HIT: ${key}`);
            return res.json(JSON.parse(data));
        }
        console.log(`Cache MISS: ${key}`);

        // Intercept res.json to save data to cache before sending
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            client.setex(key, 60, JSON.stringify(body)); // Cache 60 seconds
            return originalJson(body);
        };
        next();
    } catch (err) {
        console.error('Cache middleware error:', err.message);
        next();
    }
};

module.exports = cacheMiddleware;
