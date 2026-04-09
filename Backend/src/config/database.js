import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`MongoDB database: ${conn.connection.name}`);
};

export default connectDB;