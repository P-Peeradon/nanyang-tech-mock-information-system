import connectMongo from "../../db/mongodb";

export default defineNitroPlugin(async (nitroApp) => {
    console.log('[Nitro Plugin] Connecting to MongoDB...');
    try {
        await connectMongo();
        console.log('[Nitro Plugin] Connected to MongoDB.');
    } catch (err) {
        console.error('[Nitro Plugin] Failed to connect to MongoDB:', err);
    }
});
