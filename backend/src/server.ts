import "dotenv/config";

import http from "http";
import { app } from "./app.js";
import { connectDB, disconnectDB } from "./config/database.js";

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================

// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// ============================================
// SERVER INSTANCE
// ============================================

const server = http.createServer(app);

// ============================================
// START SERVER
// ============================================

/**
 * Start the Express server
 * - Connect to MongoDB first
 * - Then start listening on specified port
 */
const startServer = async (): Promise<void> => {
  try {
    // 1. Connect to database before starting server
    await connectDB();

    // 2. Start listening for requests
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

/**
 * Handle graceful shutdown
 * - Close server connections
 * - Disconnect from database
 */
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    await disconnectDB();
    console.log("HTTP server closed");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(async () => {
    await disconnectDB();
    console.log("HTTP server closed");
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error: Error) => {
  console.error("Unhandled Promise Rejection:", error);
  server.close(async () => {
    await disconnectDB();
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  server.close(async () => {
    await disconnectDB();
  });
  process.exit(1);
});

// Export server for testing purposes
export { server };
