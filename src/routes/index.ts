import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import contactRoutes from "./contactRoutes";
import { protectedRoute } from "../middlewares/authorization";

/**
 * @desc Entry Point: localhost:PORT/some_string
 * respect routeHandler are invoked based on some_string
 */
const router = Router();
router.use("/auth", authRoutes);
router.use("/user", protectedRoute, userRoutes);
router.use("/contact", protectedRoute, contactRoutes);
export default router;
