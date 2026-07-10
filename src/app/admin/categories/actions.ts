"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function createCategory(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  if (!name) return "Kategoriya nomini kiriting";

  const baseSlug = slugify(name) || "kategoriya";
  let slug = baseSlug;
  let i = 1;
  while (await db.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++i}`;
  }

  await db.category.create({ data: { name, slug } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();
  await db.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
