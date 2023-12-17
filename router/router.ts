import * as express from "express";
import { dnlogin, dnregister } from "../controller/dean";
import { stdlogin, stdregister } from "../controller/student";
import { getpendingsessions, getslots } from "../controller/slot";
import { bookslots } from "../controller/slot";
import { verifytoken } from "../controller/verify";
const router = express.Router();

router.post("/student/register", stdregister);
router.post("/student/login", stdlogin);
router.post("/dean/register", dnregister);
router.post("/dean/login", dnlogin);
router.post("/bookslots", verifytoken, bookslots);
router.get("/pendingsessions/:deanid", verifytoken, getpendingsessions);
router.get("/slots", verifytoken, getslots);

export default router;