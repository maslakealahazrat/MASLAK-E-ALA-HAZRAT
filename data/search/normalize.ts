export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()

    // Arabic harakat
    .replace(
      /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,
      ""
    )

    // Arabic variants
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ئ/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ة/g, "ه")
    .replace(/ۀ/g, "ه")
    .replace(/ہ/g, "ه")
    .replace(/ۃ/g, "ه")
    .replace(/ک/g, "ك")
    .replace(/ی/g, "ي")

    // Urdu/Arabic punctuation
    .replace(/[،؛؟۔]/g, " ")

    // English punctuation
    .replace(/[.,!?;:'"()[\]{}|/\\\-_=+*&^%$#@~`<>]/g, " ")

    // Multiple spaces
    .replace(/\s+/g, " ")
    .trim();
}

export function compactSearchText(value: string): string {
  return normalizeSearchText(value).replace(/\s+/g, "");
}

export function tokenizeSearchText(value: string): string[] {
  const normalized = normalizeSearchText(value);

  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);
}

export function isExactText(
  query: string,
  text: string
): boolean {
  const q = normalizeSearchText(query);
  const t = normalizeSearchText(text);

  return Boolean(q) && q === t;
}

export function containsNormalizedText(
  text: string,
  query: string
): boolean {
  const normalizedText = normalizeSearchText(text);
  const normalizedQuery = normalizeSearchText(query);

  return (
    Boolean(normalizedQuery) &&
    normalizedText.includes(normalizedQuery)
  );
}
