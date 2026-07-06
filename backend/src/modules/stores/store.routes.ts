import { Router } from "express";
import * as storeController from "./store.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router: Router = Router();

/* POST /api/v1/stores/onboarding */
router.post("/onboarding", authMiddleware, storeController.onboarding);


/* GET /api/v1/stores/me */
router.get("/me", authMiddleware, storeController.getMyStore);


/*PATCH /api/v1/stores/me */
router.patch("/me", authMiddleware, storeController.updateMyStore);


/*GET /api/v1/stores/:slug */
router.get("/:slug", storeController.getStoreBySlug);

export default router;
