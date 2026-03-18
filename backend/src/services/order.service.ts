import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";

interface CartItemInput {
  productId: string;
  quantity: number;
}

export async function createOrder(userId: string, items: CartItemInput[]) {
  if (!items || items.length === 0) {
    throw { status: 400, message: "Cart is empty" };
  }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map(i => i.productId) } }
  });

  if (products.length !== items.length) {
    throw { status: 400, message: "One or more products not found" };
  }

  let total = new Prisma.Decimal(0);

  const orderItemsData = items.map(item => {
    const product = products.find(p => p.id === item.productId)!;
    if (product.stock < item.quantity) {
      throw { status: 400, message: `Insufficient stock for ${product.name}` };
    }
    const unitPrice = product.price;
    const lineTotal = unitPrice.mul(item.quantity);
    total = total.add(lineTotal);
    return {
      productId: product.id,
      quantity: item.quantity,
      unitPrice
    };
  });

  return prisma.$transaction(async tx => {
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        totalPrice: total,
        items: {
          create: orderItemsData
        }
      },
      include: { items: true }
    });

    return order;
  });
}

export async function listOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" }
  });
}

export async function listOrdersForMerchant(merchantId: string) {
  const store = await prisma.store.findUnique({ where: { ownerId: merchantId } });
  if (!store) throw { status: 400, message: "Merchant has no store" };

  const orders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          product: {
            storeId: store.id
          }
        }
      }
    },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return orders;
}

