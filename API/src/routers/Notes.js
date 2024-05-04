import { Router } from "express";
import {
  createNotes,
  getNotes,
  deleteNotes,
  updateNotes
} from "../controller/Notes.controller.js";

const router = Router();

router.post("/create", createNotes);
// router.get("/get", getNotes);
router.delete("/delete/:id", deleteNotes);
router.post("/update", updateNotes);

export default router;
