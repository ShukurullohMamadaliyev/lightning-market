import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const adminEmail = "admin@savdo.uz";
  const adminPassword = "admin123";

  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
    },
  });

  const categories = [
    { name: "Elektronika", slug: "elektronika" },
    { name: "Kiyim-kechak", slug: "kiyim-kechak" },
    { name: "Uy-ro'zg'or buyumlari", slug: "uy-rozgor" },
    { name: "Go'zallik va salomatlik", slug: "gozallik-salomatlik" },
  ];

  const createdCategories = [];
  for (const c of categories) {
    const category = await db.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    createdCategories.push(category);
  }

  const products = [
    {
      name: "Simsiz quloqchin",
      slug: "simsiz-quloqchin",
      description: "Yuqori sifatli bluetooth quloqchin, 20 soatgacha batareya quvvati.",
      price: 250000,
      discountPrice: 199000,
      stock: 35,
      categorySlug: "elektronika",
      image: "https://picsum.photos/seed/earbuds/600/600",
    },
    {
      name: "Smart soat",
      slug: "smart-soat",
      description: "Puls o'lchagich, qadam sanagich va bildirishnomalar bilan smart soat.",
      price: 450000,
      stock: 20,
      categorySlug: "elektronika",
      image: "https://picsum.photos/seed/watch/600/600",
    },
    {
      name: "Erkaklar futbolkasi",
      slug: "erkaklar-futbolkasi",
      description: "100% paxta, kundalik kiyish uchun qulay futbolka.",
      price: 85000,
      stock: 100,
      categorySlug: "kiyim-kechak",
      image: "https://picsum.photos/seed/tshirt/600/600",
    },
    {
      name: "Ayollar ko'ylagi",
      slug: "ayollar-koylagi",
      description: "Yozgi yengil matodan tikilgan zamonaviy ko'ylak.",
      price: 150000,
      discountPrice: 120000,
      stock: 40,
      categorySlug: "kiyim-kechak",
      image: "https://picsum.photos/seed/dress/600/600",
    },
    {
      name: "Blender",
      slug: "blender",
      description: "600W quvvatli, ko'p funksiyali blender.",
      price: 320000,
      stock: 15,
      categorySlug: "uy-rozgor",
      image: "https://picsum.photos/seed/blender/600/600",
    },
    {
      name: "Yuz kremi",
      slug: "yuz-kremi",
      description: "Tabiiy tarkibli namlantiruvchi yuz kremi, 50ml.",
      price: 65000,
      stock: 60,
      categorySlug: "gozallik-salomatlik",
      image: "https://picsum.photos/seed/cream/600/600",
    },
  ];

  for (const p of products) {
    const category = createdCategories.find((c) => c.slug === p.categorySlug)!;
    await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        discountPrice: p.discountPrice,
        stock: p.stock,
        categoryId: category.id,
        images: {
          create: [{ url: p.image, order: 0 }],
        },
      },
    });
  }

  console.log("Seed tugadi.");
  console.log(`Admin login: ${adminEmail} / parol: ${adminPassword}`);
  console.log(`Admin ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
