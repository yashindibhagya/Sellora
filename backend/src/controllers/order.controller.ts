import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createOrder,
  listOrdersForUser,
  listOrdersForMerchant
} from "../services/order.service";
import { created, ok } from "../utils/apiResponse";

export async function createOrderController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const { items } = req.body;
    const order = await createOrder(req.user.sub, items);
    return created(res, order, "Order created");
  } catch (e) {
    next(e);
  }
}

export async function listUserOrdersController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const orders = await listOrdersForUser(req.user.sub);
    return ok(res, orders);
  } catch (e) {
    next(e);
  }
}

export async function listMerchantOrdersController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const orders = await listOrdersForMerchant(req.user.sub);
    return ok(res, orders);
  } catch (e) {
    next(e);
  }
}

