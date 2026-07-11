"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { saveUploadedImage } from "@/lib/upload";

async function uniqueSlug(name: string, excludeId?: string) {
  const base = slugify(name) || "mahsulot";
  let slug = base;
  let i = 1;
  while (
    await db.product.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    })
  ) {
    slug = `${base}-${++i}`;
  }
  return slug;
}

function parseProductFields(formData: FormData) {
  return {
    name: (formData.get("name") as string)?.trim(),
    description: (formData.get("description") as string)?.trim(),
    price: Number(formData.get("price")),
    discountPrice: formData.get("discountPrice")
      ? Number(formData.get("discountPrice"))
      : null,
    stock: Number(formData.get("stock")),
    categoryId: formData.get("categoryId") as string,
    isActive: formData.get("isActive") === "on",
  };
}

export async function createProduct(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();

  const fields = parseProductFields(formData);
  if (
    !fields.name ||
    !fields.categoryId ||
    !Number.isFinite(fields.price) ||
    fields.price < 0 ||
    fields.stock < 0 ||
    (fields.discountPrice != null && (!Number.isFinite(fields.discountPrice) || fields.discountPrice < 0))
  ) {
    return "Barcha majburiy maydonlarni to'g'ri to'ldiring";
  }

  const slug = await uniqueSlug(fields.name);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  let imageUrls: string[];
  try {
    imageUrls = await Promise.all(files.map(saveUploadedImage));
  } catch (err) {
    return err instanceof Error ? err.message : "Rasmni yuklashda xatolik";
  }

  await db.product.create({
    data: {
      ...fields,
      slug,
      images: { create: imageUrls.map((url, order) => ({ url, order })) },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _prevState: string | undefined,
  formData: FormData,
) {
  await requireAdmin();

  const fields = parseProductFields(formData);
  if (
    !fields.name ||
    !fields.categoryId ||
    !Number.isFinite(fields.price) ||
    fields.price < 0 ||
    fields.stock < 0 ||
    (fields.discountPrice != null && (!Number.isFinite(fields.discountPrice) || fields.discountPrice < 0))
  ) {
    return "Barcha majburiy maydonlarni to'g'ri to'ldiring";
  }

  const existing = await db.product.findUnique({ where: { id: productId } });
  if (!existing) return "Mahsulot topilmadi";

  const slug = existing.name === fields.name ? existing.slug : await uniqueSlug(fields.name, productId);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  let imageUrls: string[];
  try {
    imageUrls = await Promise.all(files.map(saveUploadedImage));
  } catch (err) {
    return err instanceof Error ? err.message : "Rasmni yuklashda xatolik";
  }

  await db.product.update({
    where: { id: productId },
    data: {
      ...fields,
      slug,
      ...(imageUrls.length > 0
        ? { images: { create: imageUrls.map((url, order) => ({ url, order })) } }
        : {}),
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath(`/product/${slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  await db.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}
