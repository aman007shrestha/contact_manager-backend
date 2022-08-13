import { Router } from "express";
import * as userInfoController from "../controllers/userInfoController";

/**
 * @desc Entry Point: localhost:PORT/user/some_string
 * based on some_string and METHODS , controller functions from user_info is invoked
 */
const router = Router();
router.get("/", userInfoController.getAllUserInfo);
router.post("/", userInfoController.createUserInfo);
router.put("/:userInfoId", userInfoController.updateUserInfo);
router.delete("/:userInfoId", userInfoController.deleteUserInfo);
router.post("/add/:userInfoId", userInfoController.addToContact);

export default router;
