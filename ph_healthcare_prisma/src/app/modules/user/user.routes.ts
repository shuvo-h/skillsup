import express from "express";
import { userControllers } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/uploader";
import { userValidationSchema } from "./user.validation";

export const userRouter = express.Router();

userRouter.get("/",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),userControllers.getAllFromDB)

userRouter.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req, res, next) => {
    req.body = userValidationSchema.createAdmin.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createAdmin(req, res, next);
  }
);

userRouter.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req, res, next) => {
    req.body = userValidationSchema.createDoctor.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createDoctor(req, res, next);
  }
);
userRouter.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req, res, next) => {
    req.body = userValidationSchema.createPatient.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createPatient(req, res, next);
  }
);

userRouter.patch("/:id/status",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),userControllers.changeProfileStatus)
