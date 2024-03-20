import express from "express";
import { addMessage, getMessages } from "../controllers/message.controller";
import authMiddleware from "../common/auth.middleware";
const router = express.Router();




router.post("/addMsg",authMiddleware, addMessage);
router.post("/getMsg",authMiddleware, getMessages);

export default router;