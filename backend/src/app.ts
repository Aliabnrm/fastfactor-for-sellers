import cors, { type CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import storeRoutes from "./modules/stores/store.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";

const app: Express = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://fastfactor.vercel.app",
];

const allowedOrigins = (process.env.CORS_ORIGINS ?? defaultAllowedOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    const normalizedOrigin = origin?.replace(/\/+$/, "");

    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
};

app.use(
  cors(corsOptions),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

// Auth API
app.use("/api/v1/auth", authRoutes);
// Store API
app.use("/api/v1/store", storeRoutes);
// Order API
app.use("/api/v1/order", orderRoutes);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
