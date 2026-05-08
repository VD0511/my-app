import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
if(!MONGODB_URL){
    throw new Error("MONGODB_URL is not defined in environment variables");
}

let cached = global.mongoose || { conn: null, promise: null};
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            console.log("MongoDB Connected ✅");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;