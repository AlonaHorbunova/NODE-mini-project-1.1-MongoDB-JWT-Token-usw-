import type { Request, Response, NextFunction } from "express";
import { Post } from "../db/models/Post.js";
import { CustomError } from "../utils/CustomError.js";

// Интерфейс для запроса с данными пользователя
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw new CustomError("Заголовок и содержание обязательны", 400);
    }

    if (!req.user?.id) {
      throw new CustomError(
        "Недостаточно прав: пользователь не определен",
        401,
      );
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
