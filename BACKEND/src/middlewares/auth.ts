import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type IUser } from "../db/models/User.js";
import { CustomError } from "../utils/CustomError.js";

interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError("Нет токена, авторизация отклонена", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new CustomError("Формат токена неверен", 401));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as IUser;

    req.user = decoded;
    next();
  } catch (error) {
    next(new CustomError("Токен не валиден", 401));
  }
};
