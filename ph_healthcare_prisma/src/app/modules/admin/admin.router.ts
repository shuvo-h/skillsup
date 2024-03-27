import { UserRole } from "@prisma/client";
import express from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { adminValidators } from "./admin.Validator";
import { adminControllers } from "./admin.controller";

export const adminRouter = express.Router();

adminRouter.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.getAllFromDB
);
adminRouter.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.getByAdminId
);
adminRouter.patch(
  "/:id",
  validateRequest(adminValidators.updateAdminValidator),
  adminControllers.updateByAdminId
);
adminRouter.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.deleteByAdminId
);
adminRouter.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.softDeleteFromDb
);
