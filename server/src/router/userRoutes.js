// src/routes/profileRoutes.js
import express from "express";
import {
  userDetails,
  getAllUserNames,
  getAllProfileNames,
  getEvents,
  getAttendence,
} from "../controller/userDetails.js";

const router = express.Router();

router.get("/userDetails", userDetails);
router.get("/userName", getAllUserNames);
router.get("/profileName", getAllProfileNames);
router.get("/userEvents", getEvents);
router.get("/userAttendence", getAttendence);

export default router;
