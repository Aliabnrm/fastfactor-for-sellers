import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthenticationError } from "../../errors/AuthenticationError.js";
import { parseInput } from "../../utils/parseInput.js";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  userIdSchema,
} from "./auth.validation.js";

const isProduction = process.env.NODE_ENV === "production";

const REFRESH_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const body = parseInput(registerSchema, req.body);
  const result = await authService.register(body);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(201).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const body = parseInput(loginSchema, req.body);
  const result = await authService.login(body);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(200).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const refresh = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken
    ? parseInput(refreshTokenSchema, req.cookies.refreshToken)
    : undefined;

  if (!refreshToken) {
    throw new AuthenticationError("رفرش توکن یافت نشد");
  }

  const result = await authService.refresh(refreshToken);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(200).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
    ? parseInput(refreshTokenSchema, req.cookies.refreshToken)
    : undefined;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("refreshToken", {
    ...REFRESH_COOKIE_OPTIONS,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = parseInput(userIdSchema, req.user!.userId);
  const user = await authService.getMe(userId);

  return res.status(200).json(user);
});
