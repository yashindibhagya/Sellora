import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
} from "../services/product.service";
import { created, ok } from "../utils/apiResponse";
import { prisma } from "../prismaClient";

export async function createProductController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const { name, description, price, stock, imageUrl } = req.body;

    const store = await prisma.store.findUnique({ where: { ownerId: req.user.sub } });
    if (!store) return res.status(400).json({ success: false, message: "Merchant has no store" });

    const product = await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock) || 0,
      imageUrl,
      storeId: store.id
    });

    return created(res, product, "Product created");
  } catch (e) {
    next(e);
  }
}

export async function listProductsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, limit, search, storeId } = req.query;
    const result = await listProducts({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: search as string | undefined,
      storeId: storeId as string | undefined
    });
    return ok(res, result);
  } catch (e) {
    next(e);
  }
}

export async function getProductController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getProductById(req.params.id);
    return ok(res, product);
  } catch (e) {
    next(e);
  }
}

export async function updateProductController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const updated = await updateProduct(req.params.id, {
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : undefined
    });
    return ok(res, updated, "Product updated");
  } catch (e) {
    next(e);
  }
}

export async function deleteProductController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteProduct(req.params.id);
    return ok(res, null, "Product deleted");
  } catch (e) {
    next(e);
  }
}

export async function updateStockController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { stock } = req.body;
    const updated = await updateStock(req.params.id, Number(stock));
    return ok(res, updated, "Stock updated");
  } catch (e) {
    next(e);
  }
}

