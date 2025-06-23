import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Exception, respHandler } from "../res-handler";
import { ERROR_TYPE, RESPONSE_STATUS } from "../res-handler/constants";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Exception(
        RESPONSE_STATUS.UNAUTHORIZED,
        ERROR_TYPE.UNAUTHORIZED,
        "Authorization token missing"
      );
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;
    } catch (error) {
      throw new Exception(
        RESPONSE_STATUS.UNAUTHORIZED,
        ERROR_TYPE.UNAUTHORIZED,
        "Invalid or expired token"
      );
    }
    next();
  } catch (error) {
    return respHandler.sendError(res, error);
  }
};
