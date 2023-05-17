import { Router } from "express";
import authValidation from "../middlewares/auth.middleware.js";
import { getRanks, userInfo } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, userInfo);
usersRouter.get("/ranking", getRanks);

export default usersRouter;
