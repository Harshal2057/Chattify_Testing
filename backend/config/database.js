import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

export const dbConnect = async() => {
    try {
        await mongoose.connect(DATABASE_URL , {
            serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
  bufferMaxEntries: 0,
  maxPoolSize: 10,
  minPoolSize: 5
        });
        console.log("Database connected successfully !!");
        
    } catch (error) {
        console.log(`Issue occur in database => ${error}`);
    }
}

export default dbConnect;