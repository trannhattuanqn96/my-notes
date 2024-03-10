import { Router } from "express";
import { Login, VerifyToken } from "../controller/Auth.controller.js";

const router = Router();

router.post("/", Login);
router.post("/verifytoken", VerifyToken);

export default router;
