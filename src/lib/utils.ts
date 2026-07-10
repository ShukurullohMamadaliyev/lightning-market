export function formatPrice(amount: number): string {
  const withSeparators = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return withSeparators + " so'm";
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    ў: "o",
    қ: "q",
    ғ: "g",
    ҳ: "h",
  };
  return text
    .toLowerCase()
    .trim()
    .replace(/[ўқғҳ]/g, (ch) => map[ch] ?? ch)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
