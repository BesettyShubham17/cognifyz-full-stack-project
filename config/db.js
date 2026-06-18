// config/db.js - MongoDB Connection (uses in-memory server if local mongod unavailable)
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
    try {
        // Try connecting to local MongoDB first
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cognifyz';
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
        console.log('MongoDB Connected');
    } catch (err) {
        console.log('Local MongoDB not found. Starting in-memory MongoDB server...');
        try {
            mongoServer = await MongoMemoryServer.create();
            const memUri = mongoServer.getUri();
            await mongoose.connect(memUri);
            console.log('MongoDB Connected');
        } catch (memErr) {
            console.error(`MongoDB Connection Error: ${memErr.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
