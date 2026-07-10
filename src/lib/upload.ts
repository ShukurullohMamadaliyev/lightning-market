import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function saveUploadedImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${crypto.randomUUID()}${ext}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
