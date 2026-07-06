export const up = (pgm) => {
  pgm.createTable("refresh_tokens", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },

    token: {
      type: "text",
      notNull: true,
      unique: true,
    },

    expires_at: {
      type: "timestamptz",
      notNull: true,
    },

    is_revoked: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex("refresh_tokens", "user_id");
};

export const down = (pgm) => {
  pgm.dropTable("refresh_tokens");
};
