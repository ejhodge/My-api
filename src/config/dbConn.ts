import mongoose from "mongoose";

export const connectDB = () => {
    if(!process.env.DATABASE_URI) {
        throw new Error(`connectDB Error: process.env.DATABASE_URI does not exist`);
    }

    try {
        return mongoose.connect(process.env.DATABASE_URI as string);
    } catch (err: any) {
        throw err
    }
};