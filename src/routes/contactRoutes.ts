import { Router } from "express";
import * as contactController from "../controllers/contactController";

/**
 * @desc Entry Point: localhost:PORT/contact/some_string
 * based on some_string and METHODS , controller functions from contact is invoked
 */
const router = Router();
router.get("/", contactController.getAllContactsForUser);
router.post("/", contactController.createContact);
router.put("/:contactId", contactController.updateContact);
router.delete("/:contactId", contactController.deleteContact);
export default router;
