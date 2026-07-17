               users
────────────────────────────────
id (PK)
email
password_hash
first_name
last_name
created_at
updated_at
────────────────────────────────
        │
        │ 1
        │
        │
        ▼
              stores
────────────────────────────────
id (PK)
owner_id (FK → users.id)
shop_name
slug (UNIQUE)
card_number
card_owner
shipping_cost
is_onboarded
created_at
updated_at
────────────────────────────────
        │
        │ 1
        │
        ▼
              orders
────────────────────────────────
id (PK)
store_id (FK → stores.id)
customer_name
customer_phone
address
postal_code
product_name
product_image_url
total_price
receipt_url
card_last_4
status
created_at
updated_at
────────────────────────────────

users
   │
   │1
   ▼
refresh_tokens
────────────────────────────────
id
user_id
token
expires_at
is_revoked
created_at
────────────────────────────────