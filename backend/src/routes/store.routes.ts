import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { createStoreController, getStoreController } from "../controllers/store.controller";

const router = Router();

router.post("/", authenticate, authorize("MERCHANT"), createStoreController);
router.get("/:id", getStoreController);

export default router;

