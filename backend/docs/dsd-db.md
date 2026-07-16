Database Schema

Table: users
| Column          | Type                       | Nullable | Default             | Description          |
| --------------- | -------------------------- | -------- | ------------------- | -------------------- |
| `id`            | `uuid`                     | ❌        | `gen_random_uuid()` | شناسه یکتای کاربر    |
| `email`         | `varchar(255)`             | ❌        | -                   | ایمیل کاربر (Unique) |
| `password_hash` | `text`                     | ❌        | -                   | رمز عبور هش شده      |
| `created_at`    | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان ایجاد           |
| `updated_at`    | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان آخرین بروزرسانی |



Table: stores
| Column          | Type                       | Nullable | Default             | Description                 |
| --------------- | -------------------------- | -------- | ------------------- | --------------------------- |
| `id`            | `uuid`                     | ❌        | `gen_random_uuid()` | شناسه فروشگاه               |
| `owner_id`      | `uuid`                     | ❌        | -                   | شناسه مالک فروشگاه          |
| `shop_name`     | `text`                     | ✅        | -                   | نام فروشگاه                 |
| `slug`          | `text`                     | ✅        | -                   | آدرس یکتای فروشگاه          |
| `card_number`   | `text`                     | ✅        | -                   | شماره کارت                  |
| `card_owner`    | `text`                     | ✅        | -                   | نام صاحب کارت               |
| `shipping_cost` | `numeric(10,2)`            | ✅        | `0`                 | هزینه ارسال                 |
| `is_onboarded`  | `boolean`                  | ❌        | `false`             | وضعیت تکمیل اطلاعات فروشگاه |
| `created_at`    | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان ایجاد                  |
| `updated_at`    | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان آخرین بروزرسانی        |



Table: orders
| Column              | Type                       | Nullable | Default             | Description          |
| ------------------- | -------------------------- | -------- | ------------------- | -------------------- |
| `id`                | `uuid`                     | ❌        | `gen_random_uuid()` | شناسه سفارش          |
| `store_id`          | `uuid`                     | ❌        | -                   | شناسه فروشگاه        |
| `customer_name`     | `text`                     | ✅        | -                   | نام مشتری            |
| `customer_phone`    | `text`                     | ✅        | -                   | شماره مشتری          |
| `address`           | `text`                     | ✅        | -                   | آدرس                 |
| `postal_code`       | `text`                     | ❌        | -                   | کد پستی              |
| `product_name`      | `text`                     | ❌        | -                   | نام محصول            |
| `product_image_url` | `text`                     | ✅        | -                   | تصویر محصول          |
| `product_price`     | `numeric(10,2)`            | ❌        | -                   | قیمت محصول           |
| `total_price`       | `numeric(10,2)`            | ❌        | -                   | مبلغ کل سفارش        |
| `receipt_url`       | `text`                     | ✅        | -                   | تصویر رسید پرداخت    |
| `card_last_4`       | `varchar(4)`               | ✅        | -                   | چهار رقم آخر کارت    |
| `status`            | `order_status`             | ❌        | `pending`           | وضعیت سفارش          |
| `created_at`        | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان ایجاد           |
| `updated_at`        | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان آخرین بروزرسانی |




Table: refresh_tokens
| Column       | Type                       | Nullable | Default             | Description         |
| ------------ | -------------------------- | -------- | ------------------- | ------------------- |
| `id`         | `uuid`                     | ❌        | `gen_random_uuid()` | شناسه توکن          |
| `user_id`    | `uuid`                     | ❌        | -                   | شناسه کاربر         |
| `token`      | `text`                     | ❌        | -                   | مقدار Refresh Token |
| `expires_at` | `timestamp with time zone` | ❌        | -                   | زمان انقضا          |
| `is_revoked` | `boolean`                  | ❌        | `false`             | وضعیت ابطال         |
| `created_at` | `timestamp with time zone` | ❌        | `CURRENT_TIMESTAMP` | زمان ایجاد          |
