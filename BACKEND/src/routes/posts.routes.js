import { Router } from "express";
import { getAllPosts, createPost } from "../controllers/posts.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllPosts);

router.post("/", authMiddleware, createPost);

export default router;
