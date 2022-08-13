import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import { protectedRoute } from "../middlewares/authorization";

const router = Router();
router.use("/auth", authRoutes);
router.use("/user", protectedRoute, userRoutes);
export default router;
