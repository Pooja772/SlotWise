import { Request } from "express";
import Users, { IUser } from "../../users/models/users";
import { Exception } from "../../../res-handler";
import { ERROR_TYPE, RESPONSE_STATUS } from "../../../res-handler/constants";
import generateToken from "../../../utility/generateToken";
import { IRole } from "../../roles/models/roles";

export interface IUserPopulated extends Omit<IUser, "roleId"> {
  roleId: IRole;
}

class AuthService {
  async login(req: Request) {
    const { email, password, portal } = req.body;

    const user = (await Users.findOne({ email }).populate(
      "roleId"
    )) as IUserPopulated;

    if (!user) {
      throw new Exception(
        RESPONSE_STATUS.NOT_FOUND,
        ERROR_TYPE.NOT_FOUND,
        `User with email ${email} not found`
      );
    }

    const encrytedPass = user.password;

    if (password !== encrytedPass) {
      throw new Exception(
        RESPONSE_STATUS.UNAUTHORIZED,
        ERROR_TYPE.UNAUTHORIZED,
        "Invalid email or password"
      );
    }

    // Portal role check
    if (portal === "Admin" && user.roleId.name !== "Admin") {
      throw new Exception(
        RESPONSE_STATUS.UNAUTHORIZED,
        ERROR_TYPE.UNAUTHORIZED,
        "User not authorized for admin portal"
      );
    }

    if (portal === "User" && user.roleId.name !== "User") {
      throw new Exception(
        RESPONSE_STATUS.UNAUTHORIZED,
        ERROR_TYPE.UNAUTHORIZED,
        "Admin cannot login to user portal"
      );
    }

    const token = generateToken(user._id.toString(), user.roleId.name);

    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      token,
      user: userWithoutPassword,
    };
  }
}

export default new AuthService();
