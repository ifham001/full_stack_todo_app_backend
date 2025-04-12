const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;