import Roles from "../modules/roles/models/roles";
import logger from "../utility/logger";

export const seedRoles = async () => {
  try {
    const existingRoles = await Roles.find();
    if (existingRoles.length === 0) {
      const roles = [
        { name: "Admin", permissions: ["create", "read", "update", "delete"] },
        { name: "User", permissions: ["read"] },
      ];
      await Roles.insertMany(roles);
      logger.info("Roles seeded successfully.");
    } else {
      logger.info("Roles already exist. Skipping seeding.");
    }
  } catch (error) {
    logger.error("Error in role seeding:", error);
  }
};
