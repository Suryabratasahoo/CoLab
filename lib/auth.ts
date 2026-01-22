import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserIdFromToken(token: string) {
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}
