import mongoose from "mongoose";

export async function connectDB() {
    try {
        const URL = process.env.NEXT_PUBLIC_MONGO_URL;
        mongoose.connect(URL!);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log("MongoDB connected successfully")
        });
        connection.on("disconnected", ()=>{
            console.log("MongoDB disconnected")
        });
        connection.on("error", (error)=>{
            console.log("MongoDB connection error" + error);
            process.exit();
        });
    } catch (error) {
        throw new Error("Failed to connect to database")
    }
}