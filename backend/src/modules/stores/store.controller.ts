import type { Request, Response } from "express";
import * as storeService from "./store.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AppError } from "../../errors/AppError.js";

interface StoreSlugParams {
  slug: string;
}

export const onboarding = catchAsync(async (req: Request, res: Response) => {
  const store = await storeService.onboarding(req.user!.userId, req.body);

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
  const store = await storeService.updateMyStore(req.user!.userId, req.body);

  return res.status(200).json({
    success: true,
    message: "اطلاعات فروشگاه بروزرسانی شد.",
    data: store,
  });
});

export const getStoreBySlug = catchAsync(async (req, res) => {
  const slug = String(req.params.slug);

  if (!slug) {
    throw new AppError("Slug is required", 400);
  }

  const store = await storeService.getStoreBySlug(slug);

  return res.status(200).json({
    success: true,
    data: store,
  });
});
