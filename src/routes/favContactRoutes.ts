import { Router } from "express";
import * as favController from "../controllers/favController";

/**
 * @desc Entry Point: localhost:PORT/fav/some_string
 * based on some_string and METHODS , controller functions from contact is invoked
 */
const router = Router();
router.post("/", favController.setFavouriteContact);
router.delete("/:contactId", favController.unsetFavouriteContact);
router.get("/", favController.getAllFavourites);

export default router;
