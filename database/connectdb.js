import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🐳 Connected to MongoDB 🐳");
} catch (error) {
    console.log("🛑Error: "+error);
}

