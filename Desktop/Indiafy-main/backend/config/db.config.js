import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const databaseConfig = async () => {
    try{
        const db = await mongoose.connect(process.env.MongoDb_Url);
        console.log("✅Database Connect Successfully");
        return db;
    }
    catch(err){
        console.error("❌Database Connection Failed:", err.message);
    }
}