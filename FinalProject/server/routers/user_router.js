import express from "express";
import userController from "../controllers/user_controller.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/all", userController.all);
userRouter.get("/fetchUser/:id", userController.fetchUser);

export default userRouter;
