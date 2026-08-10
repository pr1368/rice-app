import dotenv from "dotenv";
import dns from "node:dns";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

// MongoDB Atlas DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();