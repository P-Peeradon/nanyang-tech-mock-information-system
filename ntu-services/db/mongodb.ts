import mongoose from "mongoose";

const NTU_REGISTRAR_URI: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ntu_stars_db';

const connectDB = async () => {
    try {
        await mongoose.connect(NTU_REGISTRAR_URI);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export default connectDB;