import express, { response } from "express";
import { createUserCtr, logicUserCtr } from "../controllers/users.controller.js";
const router = express.Router();

router.post("/signup", createUserCtr);
router.post("/login", logicUserCtr);


export default router;
