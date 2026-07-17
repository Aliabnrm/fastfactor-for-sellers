import { AppError } from "../../errors/AppError.js";
import * as orderRepository from "./order.repository.js";
import type { Order, OrderStatus } from "./order.types.js";

export const getMyOrders = async (ownerId: string): Promise<Order[]> => {
  return await orderRepository.getOrdersByOwnerId(ownerId);
};

export const getMyOrderById = async (
  ownerId: string,
  orderId: string,
): Promise<Order> => {
  const order = await orderRepository.getOrderByIdAndOwnerId(orderId, ownerId);

  if (!order) {
    throw new AppError("سفارش پیدا نشد.", 404);
  }

  return order;
};

export const updateOrderStatus = async (
  ownerId: string,
  orderId: string,
  status: OrderStatus,
): Promise<Order> => {
  const order = await orderRepository.getOrderByIdAndOwnerId(orderId, ownerId);

  if (!order) {
    throw new AppError("سفارش پیدا نشد.", 404);
  }

  return await orderRepository.updateOrderStatus(orderId, status);
};
