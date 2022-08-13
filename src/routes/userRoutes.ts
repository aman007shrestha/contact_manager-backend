import { Router } from "express";
import * as userInfoController from "../controllers/userInfoController";

const router = Router();
router.get("/", userInfoController.getAllUserInfo);
router.post("/", userInfoController.createUserInfo);
router.put("/:userInfoId", userInfoController.updateUserInfo);
router.delete("/:userInfoId", userInfoController.deleteUserInfo);
export default router;
