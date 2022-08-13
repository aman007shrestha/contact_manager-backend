import { Router } from "express";
import * as authController from "../controllers/authController";

/**
 * @desc Entry Point: localhost:PORT/auth/some_string
 * based on some_string and METHODS, controller functions from auth is invoked
 */
const router = Router();
router.post("/login", authController.login);
router.post("/register", authController.register);
export default router;
