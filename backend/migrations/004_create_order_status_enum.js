export const up = (pgm) => {
  pgm.createType("order_status", [
    "pending",
    "confirmed",
    "delivered",
    "rejected",
  ]);
};

export const down = (pgm) => {
  pgm.dropType("order_status");
};
