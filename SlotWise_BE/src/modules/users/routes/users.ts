import { Router } from "express";
import userController from "../controllers/users"; // assuming controller is in this path
import { createUserValidation } from "../validators/userValidation";
import { Validator } from "../../../utility/validator";
import { validateToken } from "../../../utility/validateToken";

const userRouter = Router();

userRouter.post(
  "/user",
  validateToken,
  createUserValidation,
  Validator.makeValidation,
  userController.createUser
);
userRouter.get("/user/:id", validateToken, userController.getUserById);
userRouter.get("/users", validateToken, userController.getAllUsers);
userRouter.put("/user/:id", validateToken, userController.updateUser);
userRouter.delete("/user/:id", validateToken, userController.deleteUser);

export default userRouter;
