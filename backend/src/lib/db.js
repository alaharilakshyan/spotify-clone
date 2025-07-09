import mongoose from 'mongoose';


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error: Check your MongoDB connection string", error);
        process.exit(1); // Exit process with failure

    }
}