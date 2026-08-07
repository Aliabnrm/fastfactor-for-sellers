import type { Request, Response } from "express";
import * as storeService from "./store.service.js";
import { AppError } from "../../errors/AppError.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { parseInput } from "../../utils/parseInput.js";
import {
  createStoreSchema,
  storeSlugParamsSchema,
  updateStoreSchema,
} from "./store.validation.js";

export const onboarding = catchAsync(async (req: Request, res: Response) => {
  const body = parseInput(createStoreSchema, req.body);
  const store = await storeService.onboarding(req.user!.userId, body);

  return res.status(201).json({
    success: true,
    message: "فروشگاه با موفقیت ایجاد شد.",
    data: store,
  });
});

export const getMyStore = catchAsync(async (req: Request, res: Response) => {
  const store = await storeService.getMyStore(req.user!.userId);

  return res.status(200).json({
    success: true,
    data: store,
  });
});

export const updateMyStore = catchAsync(async (req: Request, res: Response) => {
  const body = parseInput(updateStoreSchema, req.body);
  const store = await storeService.updateMyStore(req.user!.userId, body);

  return res.status(200).json({
    success: true,
    message: "اطلاعات فروشگاه بروزرسانی شد.",
    data: store,
  });
});

export const getStoreBySlug = catchAsync(async (req, res) => {
  const { slug } = parseInput(storeSlugParamsSchema, req.params);

  if (!slug) {
    throw new AppError("Slug is required", 400);
  }

  const store = await storeService.getStoreBySlug(slug);

  return res.status(200).json({
    success: true,
    data: store,
  });
});

export const checkSlug = catchAsync(async (req, res) => {
  const { slug } = parseInput(storeSlugParamsSchema, req.params);

  if (!slug) {
    throw new AppError("Slug is required.", 400);
  }

  const result = await storeService.checkSlug(slug);

  return res.status(200).json({
    success: true,
    data: result,
  });
});
