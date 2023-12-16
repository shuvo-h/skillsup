import express  from "express"
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
export const authRouter = express.Router();

authRouter.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser)
authRouter.post('/change-password',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser)