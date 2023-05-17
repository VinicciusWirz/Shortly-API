import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { signupSchema } from "../schemas/signup.schema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signupSchema), signup);
authRouter.post("/signin", signin);

export default authRouter;
