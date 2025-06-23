import mongoose from "mongoose";
import { seedRoles } from "../seeders/roles";
import logger from "../utility/logger";

const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI as string; // Get MongoDB URI from environment variable

  try {
    const connection = await mongoose.connect(mongoUri);
    await seedRoles();
    logger.info(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;
