import express from "express";
import { dnlogin, dnregister } from "../controller/dean.js";
import { stdlogin, stdregister } from "../controller/student.js";
import { getpendingsessions, getslots } from "../controller/slot.js";
import { bookslots } from "../controller/slot.js";
import { verifytoken } from "../controller/verify.js";
const router = express.Router();

router.post("/student/register", stdregister);
router.post("/student/login", stdlogin);
router.post("/dean/register", dnregister);
router.post("/dean/login", dnlogin);
router.post("/bookslots", verifytoken, bookslots);
router.get("/pendingsessions/:deanid", verifytoken, getpendingsessions);
router.get("/slots", verifytoken, getslots);

export default router;