import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

export const dbConnect = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 90000,
            connectTimeoutMS: 60000,
            maxPoolSize: 3,
            minPoolSize: 0,
            bufferCommands: false,
            retryWrites: true
        });
        console.log("Database connected successfully !!");
    } catch (error) {
        console.log(`Issue occur in database => ${error}`);
        // Optional: exit process on connection failure
        // process.exit(1);
    }
};

// Optional: Add connection event listeners
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

export default dbConnect;