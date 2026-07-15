import cors from "cors";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import storeRoutes from "./modules/stores/store.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { requestIdMiddleware } from "./middleware/requestId.middleware.js";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// 🔐 Auth API
app.use("/api/v1/auth", authRoutes);
// 🏪 Store API
app.use("/api/v1/store", storeRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.get("/", (_, res) => {
  res.send("Server is running");
});

export default app;