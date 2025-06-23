import { Request, Response } from "express";
import authService from "../services/auth";
import { respHandler } from "../../../res-handler";
import { RESPONSE_STATUS } from "../../../res-handler/constants";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req);
      respHandler.apiResponseSuccess(
        res,
        result,
        RESPONSE_STATUS.SUCCESS,
        "Login successful"
      );
    } catch (err) {
      respHandler.sendError(res, err);
    }
  }
}

export default new AuthController();
