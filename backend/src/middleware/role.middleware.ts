import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function authorize(...roles: ("CUSTOMER" | "MERCHANT" | "ADMIN")[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}

