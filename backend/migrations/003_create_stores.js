export const up = (pgm) => {
  pgm.createTable("stores", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    owner_id: {
      type: "uuid",
      notNull: true,
      unique: true,
      references: "users",
      onDelete: "CASCADE",
    },

    shop_name: {
      type: "text",
    },

    slug: {
      type: "text",
      unique: true,
    },

    card_number: {
      type: "text",
    },

    card_owner: {
      type: "text",
    },

    shipping_cost: {
      type: "numeric(10,2)",
      default: 0,
    },

    is_onboarded: {
      type: "boolean",
      notNull: true,
      default: false,
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

  pgm.createIndex("stores", "owner_id");
  pgm.createIndex("stores", "slug");
};

export const down = (pgm) => {
  pgm.dropTable("stores");
};
