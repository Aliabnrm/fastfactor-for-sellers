import pool from "../../database/index.js";
import type { CreateOrderDTO, Order, OrderStatus } from "./order.types.js";

export const createOrder = async (
  storeId: string,
  data: CreateOrderDTO,
): Promise<Order> => {
  const query = `
    INSERT INTO orders (
      store_id,
      customer_name,
      customer_phone,
      address,
      postal_code,
      product_name,
      product_image_url,
      product_price,
      total_price,
      receipt_url,
      card_last_4
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
    )
    RETURNING *;
  `;

  const values = [
    storeId,
    data.customer_name,
    data.customer_phone,
    data.address,
    data.postal_code,
    data.product_name,
    data.product_image_url ?? null,
    data.product_price,
    data.total_price,
    data.receipt_url ?? null,
    data.card_last_4 ?? null,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getOrdersByOwnerId = async (ownerId: string): Promise<Order[]> => {
  const query = `
    SELECT
      o.*
    FROM orders o
    INNER JOIN stores s
      ON s.id = o.store_id
    WHERE s.owner_id = $1
    ORDER BY o.created_at DESC;
  `;

  const { rows } = await pool.query(query, [ownerId]);

  return rows;
};

export const getOrderByIdAndOwnerId = async (
  orderId: string,
  ownerId: string,
): Promise<Order | null> => {
  const query = `
    SELECT
      o.*
    FROM orders o
    INNER JOIN stores s
      ON s.id = o.store_id
    WHERE
      o.id = $1
      AND s.owner_id = $2
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [orderId, ownerId]);

  return rows[0] ?? null;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
): Promise<Order> => {
  const query = `
    UPDATE orders
    SET
      status = $2,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [orderId, status]);

  return rows[0];
};
