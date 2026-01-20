import mongoose from "mongoose";

const config = useRuntimeConfig();

const connectMongo = async () => {
    try {
        await mongoose.connect(config.mongodbURI);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export default connectMongo;