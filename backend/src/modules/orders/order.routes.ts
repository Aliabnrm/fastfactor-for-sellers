import { Router } from "express";
import * as orderController from "./order.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router: Router = Router();


/* POST /api/v1/orders/:slug */
router.post("/:slug", orderController.createOrder);

/* GET /api/v1/orders */
router.get("/", authMiddleware, orderController.getMyOrders);

/* GET /api/v1/orders/:orderId */
router.get("/:orderId", authMiddleware, orderController.getMyOrderById);

export default router;
