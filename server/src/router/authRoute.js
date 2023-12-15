// src/routes/authRoutes.js
import express from "express";
import { signup, login, resetMail } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetMail);

export default router;
