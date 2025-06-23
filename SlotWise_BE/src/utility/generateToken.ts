import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId: string, role: string) => {
  try {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, {
      expiresIn: "21d",
    });
  } catch (error) {
    throw error;
  }
};

export default generateToken;
