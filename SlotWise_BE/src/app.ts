import dotenv from 'dotenv';
import http from 'http';
import ServerSetup from './server';
import connectionDatabase from './config/dbConnection';
import logger from './utility/logger';

// Load environment variables
dotenv.config();

// Normalize the port (this will handle both strings and numbers)
const normalizePort = (portVal: string | number) => {
  const port = typeof portVal === 'string' ? parseInt(portVal) : portVal;
  if (isNaN(port)) {
    return portVal;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
};

// Get the port from environment variable or default to 5000
const port = normalizePort(process.env.SERVERPORT || 5000);

// Initialize the Express app
const serverInstance = new ServerSetup();
const expressInstance = serverInstance.expressInstance;

// Create the HTTP server
const server = http.createServer(expressInstance);

// Start the server and listen on the specified port
server.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

// Set the port for Express instance (useful for frameworks like PM2)
expressInstance.set('port', port);

// Establish MongoDB connection
connectionDatabase()
  .then(async () => {
    logger.info("MongoDB connection established successfully");
    await serverInstance.initializeServer();
  })
  .catch((err) => {
    logger.error("MongoDB connection failed:", err);
    process.exit(1);
  });