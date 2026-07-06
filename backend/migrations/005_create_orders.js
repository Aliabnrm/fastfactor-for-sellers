export const up = (pgm) => {
  pgm.createTable("orders", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    store_id: {
      type: "uuid",
      notNull: true,
      references: "stores",
      onDelete: "CASCADE",
    },

    customer_name: {
      type: "text",
    },

    customer_phone: {
      type: "text",
    },

    address: {
      type: "text",
    },

    postal_code: {
      type: "text",
      notNull: true,
    },

    product_name: {
      type: "text",
      notNull: true,
    },

    product_image_url: {
      type: "text",
    },

    product_price: {
      type: "numeric(10,2)",
      notNull: true,
    },

    total_price: {
      type: "numeric(10,2)",
      notNull: true,
    },

    receipt_url: {
      type: "text",
    },

    card_last_4: {
      type: "varchar(4)",
    },

    status: {
      type: "order_status",
      notNull: true,
      default: "pending",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex("orders", "store_id");
  pgm.createIndex("orders", "status");
  pgm.createIndex("orders", "created_at");
};

export const down = (pgm) => {
  pgm.dropTable("orders");
};
