import { prisma } from "../prismaClient";

export async function createStore(ownerId: string, name: string) {
  const existing = await prisma.store.findUnique({ where: { ownerId } });
  if (existing) throw { status: 400, message: "Merchant already has a store" };

  return prisma.store.create({
    data: { name, ownerId }
  });
}

export async function getStoreById(id: string) {
  const store = await prisma.store.findUnique({ where: { id } });
  if (!store) throw { status: 404, message: "Store not found" };
  return store;
}

