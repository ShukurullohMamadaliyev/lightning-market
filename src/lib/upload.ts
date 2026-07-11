import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const SIGNATURES: { ext: string; check: (buf: Buffer) => boolean }[] = [
  { ext: ".jpg", check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: ".png",
    check: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  { ext: ".gif", check: (b) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 },
  {
    ext: ".webp",
    check: (b) =>
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
];

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export async function saveUploadedImage(file: File): Promise<string> {
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Rasm hajmi 5MB dan oshmasligi kerak");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Trust actual file bytes, not the client-supplied filename/MIME type,
  // so a renamed .html/.svg payload can't slip past as an "image".
  const match = SIGNATURES.find((sig) => sig.check(buffer));
  if (!match) {
    throw new Error("Faqat JPG, PNG, WEBP yoki GIF formatidagi rasmlar qabul qilinadi");
  }

  const filename = `${crypto.randomUUID()}${match.ext}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
