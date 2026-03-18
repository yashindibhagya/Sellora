import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";

interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  storeId: string;
}

export async function createProduct(input: CreateProductInput) {
  return prisma.product.create({
    data: {
      name: input.name,
      description: input.description,
      price: new Prisma.Decimal(input.price),
      stock: input.stock,
      imageUrl: input.imageUrl,
      storeId: input.storeId
    }
  });
}

export async function listProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  storeId?: string;
}) {
  const page = params.page && params.page > 0 ? params.page : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : 20;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {};
  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } }
    ];
  }
  if (params.storeId) where.storeId = params.storeId;

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count({ where })
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw { status: 404, message: "Product not found" };
  return product;
}

export async function updateProduct(id: string, data: Partial<CreateProductInput>) {
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      price: data.price !== undefined ? new Prisma.Decimal(data.price) : undefined
    }
  });
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}

export async function updateStock(id: string, stock: number) {
  if (stock < 0) throw { status: 400, message: "Stock cannot be negative" };
  return prisma.product.update({
    where: { id },
    data: { stock }
  });
}

