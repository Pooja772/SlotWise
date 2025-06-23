import { Router } from "express";
import AuthController from "../controllers/auth";
import { authValidator } from "../validators/authValidation";
import { Validator } from "../../../utility/validator";
import { validateToken } from "../../../utility/validateToken";

const authRouter = Router();

authRouter.post("/login", authValidator, Validator.makeValidation, AuthController.login);

export default authRouter;
