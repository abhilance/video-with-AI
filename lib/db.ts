import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your environment variables");
}

// Add proper typing for the global cache
declare global {
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    };
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<mongoose.Connection> {
    // If we already have a connection, return it
    if (cached.conn) {
        return cached.conn;
    }
    
    // If we don't have a promise, create one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering
        };
        
        // ✅ FIX: Properly create and store the promise
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("✅ Connected to MongoDB");
            return mongoose.connection;
        });
    }
    
    try {
        // ✅ FIX: Now cached.promise exists and can be awaited
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset promise on error so next attempt will create a new connection
        cached.promise = null;
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
    
    return cached.conn;
}