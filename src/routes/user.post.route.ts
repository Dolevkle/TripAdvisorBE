import express from "express";
const router = express.Router();
import userPostController from "../controllers/user.post.controller";
import authMiddleware from "../common/auth.middleware";

router.get("/", userPostController.get.bind(userPostController));

router.get("/:id", userPostController.getById.bind(userPostController));

router.post("/", authMiddleware, userPostController.post.bind(userPostController));

router.get("/user/allPosts", authMiddleware,userPostController.getPostsByOwner.bind(userPostController));

router.put("/:id", authMiddleware, userPostController.putById.bind(userPostController));

router.delete("/:id", authMiddleware, userPostController.deleteById.bind(userPostController));

export default router;