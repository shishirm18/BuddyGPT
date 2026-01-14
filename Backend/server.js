import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch(err) {
    console.log("Failed to connect with DB", err);
  }
}

// Connect to DB immediately
connectDB();

// Only listen on port if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
