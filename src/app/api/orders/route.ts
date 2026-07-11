import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const orderSchema = z.object({
  deliveryAddress: z.string().min(3).max(300),
  phone: z.string().min(5).max(30),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive().max(100),
      }),
    )
    .min(1)
    .max(50),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
  }

  const ip = getClientIp(request.headers);
  if (!rateLimit(`orders:${session.user.id}:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Juda ko'p urinish. Birozdan so'ng qayta urinib ko'ring." },
      { status: 429 },
    );
  }

  const parsed = orderSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Noto'g'ri ma'lumot" }, { status: 400 });
  }
  const { deliveryAddress, phone, items } = parsed.data;

  const productIds = items.map((i) => i.productId);
  const products = await db.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return NextResponse.json(
        { error: "Mahsulotlardan biri topilmadi" },
        { status: 400 },
      );
    }
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `"${product.name}" uchun yetarli mahsulot yo'q` },
        { status: 400 },
      );
    }
  }

  const totalAmount = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)!;
    const price = product.discountPrice ?? product.price;
    return sum + price * item.quantity;
  }, 0);

  const order = await db.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId: session.user.id,
        deliveryAddress,
        phone,
        totalAmount,
        items: {
          create: items.map((item) => {
            const product = productMap.get(item.productId)!;
            return {
              productId: item.productId,
              quantity: item.quantity,
              priceAtOrder: product.discountPrice ?? product.price,
            };
          }),
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
