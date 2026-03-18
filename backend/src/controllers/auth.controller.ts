import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { created, ok } from "../utils/apiResponse";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const result = await registerUser({ name, email, password, role });
    return created(res, result, "User registered");
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const result = await loginUser(email, password);
    return ok(res, result, "Logged in");
  } catch (e) {
    next(e);
  }
}

