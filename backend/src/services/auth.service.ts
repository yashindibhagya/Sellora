import { prisma } from "../prismaClient";
import { hashPassword, comparePassword } from "../utils/password";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { Role } from "@prisma/client";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw { status: 400, message: "Email already in use" };
  }

  const hashed = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashed,
      role: input.role || "CUSTOMER"
    }
  });

  const payload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken
  };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: "Invalid credentials" };

  const valid = await comparePassword(password, user.password);
  if (!valid) throw { status: 400, message: "Invalid credentials" };

  const payload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken
  };
}

