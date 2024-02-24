import express from "express";
import { addMessage, getMessages } from "../controllers/message.controller";
const router = express.Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getMessages);

export default router;