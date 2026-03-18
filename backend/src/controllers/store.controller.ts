import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createStore, getStoreById } from "../services/store.service";
import { created, ok } from "../utils/apiResponse";

export async function createStoreController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Missing store name" });

    const store = await createStore(req.user.sub, name);
    return created(res, store, "Store created");
  } catch (e) {
    next(e);
  }
}

export async function getStoreController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const store = await getStoreById(req.params.id);
    return ok(res, store);
  } catch (e) {
    next(e);
  }
}

