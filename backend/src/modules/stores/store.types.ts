export interface Store {
  id: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
  slug: string | null;
  shipping_cost: number;
  is_onboarded: boolean;
  shop_name: string | null;
  card_owner: string | null;
  card_number: string | null;
}

export interface OnboardingDTO {
  slug: string;
  shop_name: string;
  card_owner: string;
  card_number: string;
  shipping_cost: number;
}

export interface UpdateStoreDTO {
  slug?: string | undefined;
  shop_name?: string | undefined;
  card_owner?: string | undefined;
  card_number?: string | undefined;
  shipping_cost?: number | undefined;
}
