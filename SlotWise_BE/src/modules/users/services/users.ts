import Users, { IUser } from "../models/users";
import { Exception } from "../../../res-handler";
import { ERROR_TYPE, RESPONSE_STATUS } from "../../../res-handler/constants";
import mongoose from "mongoose";
import Roles from "../../roles/models/roles";
import { encryptPassword } from "../utils/utils";
import logger from "../../../utility/logger";

class UserService {
  async createUser(req: any) {
    try {
      const { name, email, password, roleId } = req.body;

      const roleExit = await Roles.findOne({ _id: roleId });

      if (!roleExit) {
        throw new Exception(
          RESPONSE_STATUS.NOT_FOUND,
          ERROR_TYPE.NOT_FOUND,
          `Role Id ${roleId} does not exist.`
        );
      }

      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        throw new Exception(
          RESPONSE_STATUS.ALREADY_EXISTS,
          ERROR_TYPE.ALREADY_EXISTS,
          `Email ${email} already exists`
        );
      }
      const encryptedPassword = encryptPassword(password);

      const newUser = new Users({
        name,
        email,
        password: encryptedPassword,
        roleId,
      });
     logger.info("newUser", newUser);
      const savedUser = await newUser.save();

      // Completely remove 'password' key
      const { password: _, ...userWithoutPassword } = savedUser.toObject();

      return userWithoutPassword;
    } catch (err) {
      throw err;
    }
  }

  async getUserById(req: any) {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (!user) {
      throw new Exception(
        RESPONSE_STATUS.NOT_FOUND,
        ERROR_TYPE.NOT_FOUND,
        `User with id ${userId} not found`
      );
    }
    return user;
  }

  async getAllUsers() {
    return await Users.find();
  }

  async updateUser(req: any) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const userId = req.params.id;
      const { name, email, password, roleId } = req.body;

      const userExist = await Users.findById(userId).session(session);
      if (!userExist) {
        throw new Exception(
          RESPONSE_STATUS.NOT_FOUND,
          ERROR_TYPE.NOT_FOUND,
          `User with id ${userId} not found`
        );
      }

      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { name, email, password, roleId },
        { new: true, session }
      );

      await session.commitTransaction();
      return updatedUser;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async deleteUserById(req: any) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const userId = req.params.id;

      const userExist = await Users.findById(userId).session(session);
      if (!userExist) {
        throw new Exception(
          RESPONSE_STATUS.NOT_FOUND,
          ERROR_TYPE.NOT_FOUND,
          `User with id ${userId} not found`
        );
      }

      const deleted = await Users.findByIdAndDelete(userId).session(session);

      await session.commitTransaction();
      return deleted;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }
}

export default new UserService();
