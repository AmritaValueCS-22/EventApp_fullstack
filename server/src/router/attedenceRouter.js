// src/routes/authRoutes.js
import express from "express";
import { signup, login } from "../controller/authController.js";
import {
  attendanceUpdate,
  getAttedence,
} from "../controller/attendenceController.js";
import { authenticateUser } from "../middlewear/authMiddleWear.js";

const router = express.Router();

router.post("/add", authenticateUser, attendanceUpdate);
router.get("/getAttedence", getAttedence);

export default router;
