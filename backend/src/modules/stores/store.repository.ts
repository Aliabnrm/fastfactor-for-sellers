
import pool from "../../database/index.js";
import type { OnboardingDTO, Store, UpdateStoreDTO } from "./store.types.js";

export const createStore = async (
  ownerId: string,
  data: OnboardingDTO,
): Promise<Store> => {
  const query = `
    INSERT INTO stores (
      owner_id,
      shop_name,
      slug,
      card_number,
      card_owner,
      shipping_cost,
      is_onboarded
    )
    VALUES ($1,$2,$3,$4,$5,$6,true)
    RETURNING *;
  `;

  const values = [
    ownerId,
    data.shop_name,
    data.slug,
    data.card_number,
    data.card_owner,
    data.shipping_cost,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getStoreByOwnerId = async (
  ownerId: string,
): Promise<Store | null> => {
  const query = `
    SELECT *
    FROM stores
    WHERE owner_id = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [ownerId]);

  return rows[0] ?? null;
};

export const getStoreBySlug = async (slug: string): Promise<Store | null> => {
  const query = `
    SELECT
      id,
      shop_name,
      slug,
      card_owner,
      card_number,
      shipping_cost
    FROM stores
    WHERE slug = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [slug]);

  return rows[0] ?? null;
};

export const slugExists = async (slug: string): Promise<boolean> => {
  const query = `
    SELECT 1
    FROM stores
    WHERE slug = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [slug]);

  return rows.length > 0;
};

export const updateStore = async (
  ownerId: string,
  data: UpdateStoreDTO,
): Promise<Store> => {
  const query = `
    UPDATE stores
    SET
      shop_name = COALESCE($2, shop_name),
      slug = COALESCE($3, slug),
      card_number = COALESCE($4, card_number),
      card_owner = COALESCE($5, card_owner),
      shipping_cost = COALESCE($6, shipping_cost),
      updated_at = NOW()
    WHERE owner_id = $1
    RETURNING *;
  `;

  const values = [
    ownerId,
    data.shop_name ?? null,
    data.slug ?? null,
    data.card_number ?? null,
    data.card_owner ?? null,
    data.shipping_cost ?? null,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};
