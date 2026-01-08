import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI!;
if(!MONGODB_URI)throw Error("MongoDB URI is not loaded fron .env");

declare global {
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}


let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export default async function connectDB(){
    if(cached.conn)return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}