import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../errors/AuthenticationError.js";
import { parseInput } from "../utils/parseInput.js";
import { bearerTokenSchema, userIdSchema } from "../modules/auth/auth.validation.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError("توکن ارسال نشده است");
    }

    const sanitizedAuthHeader = parseInput(bearerTokenSchema, authHeader);
    const token = sanitizedAuthHeader.split(/\s+/)[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };

    req.user = {
      userId: parseInput(userIdSchema, decoded.userId),
    };

    next();
  } catch (error) {
    next(new AuthenticationError("توکن نامعتبر است"));
  }
};
