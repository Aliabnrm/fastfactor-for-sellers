import { AppError } from "../../errors/AppError.js";
import * as orderRepository from "./order.repository.js";
import * as storeRepository from "../stores/store.repository.js";
import type { CreateOrderDTO, Order, OrderStatus } from "./order.types.js";


export const createOrder = async (
  storeSlug: string,
  data: CreateOrderDTO,
): Promise<Order> => {
  const store = await storeRepository.getStoreBySlug(storeSlug);

  if (!store) {
    throw new AppError("فروشگاه موردنظر وجود ندارد.", 404);
  }

  const total = Number(data.product_price) + Number(store.shipping_cost);

  const order = await orderRepository.createOrder(store.id, {
    ...data,
    total_price: total,
  });

  return order;
};


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
