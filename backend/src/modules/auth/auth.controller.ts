import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthenticationError } from "../../errors/AuthenticationError.js";

const REFRESH_COOKIE_OPTIONS = {
  path: "/",
  secure: false,
  httpOnly: true,
  sameSite: "lax" as const,
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(201).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  return res.status(200).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const refresh = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

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
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("refreshToken", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.userId);

  return res.status(200).json(user);
});