import type { Request, Response, NextFunction } from "express";
import { User } from "../db/models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { CustomError } from "../utils/CustomError.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Бросаем кастомную ошибку вместо прямого ответа
      throw new CustomError("Email уже занят", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Пользователь создан успешно" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Пользователь не найден", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Неверный пароль", 401);
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
