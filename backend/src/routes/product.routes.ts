import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createProductController,
  listProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  updateStockController
} from "../controllers/product.controller";

const router = Router();

router.get("/", listProductsController);
router.get("/:id", getProductController);

router.post("/", authenticate, authorize("MERCHANT"), createProductController);
router.put("/:id", authenticate, authorize("MERCHANT"), updateProductController);
router.delete("/:id", authenticate, authorize("MERCHANT"), deleteProductController);

router.patch("/:id/stock", authenticate, authorize("MERCHANT"), updateStockController);

export default router;

