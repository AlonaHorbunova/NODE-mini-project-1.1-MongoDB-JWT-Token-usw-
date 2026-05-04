import jwt from "jsonwebtoken";

interface UserPayload {
  _id: any;
  username: string;
}

const generateToken = (user: UserPayload): string => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET as string, // Явно указываем, что это строка
    { expiresIn: "24h" },
  );
};

export default generateToken;
