import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createOrderController,
  listMerchantOrdersController,
  listUserOrdersController
} from "../controllers/order.controller";

const router = Router();

router.post("/", authenticate, authorize("CUSTOMER"), createOrderController);
router.get("/", authenticate, authorize("MERCHANT"), listMerchantOrdersController);
router.get("/user", authenticate, authorize("CUSTOMER"), listUserOrdersController);

export default router;

