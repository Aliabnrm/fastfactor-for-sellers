import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import * as orderService from "./order.service.js";

interface OrderParams {
  orderId: string;
}
interface CreateOrderParams {
  slug: string;
}

export const createOrder = catchAsync(
  async (req: Request<CreateOrderParams>, res: Response) => {
    const order = await orderService.createOrder(req.params.slug, req.body);

    return res.status(201).json({
      success: true,
      message: "سفارش با موفقیت ثبت شد.",
      data: order,
    });
  },
);


export const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getMyOrders(req.user!.userId);

  return res.status(200).json({
    success: true,
    data: orders,
  });
});


export const getMyOrderById = catchAsync(
  async (req: Request<OrderParams>, res: Response) => {
    const order = await orderService.getMyOrderById(
      req.user!.userId,
      req.params.orderId,
    );

    return res.status(200).json({
      success: true,
      data: order,
    });
  },
);