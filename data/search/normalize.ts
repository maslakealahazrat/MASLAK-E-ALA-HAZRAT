/**
 * Maslak-e-Ala Hazrat
 * Shared Search Text Normalizer
 *
 * IMPORTANT:
 * Yeh functions sirf search ke liye text normalize karte hain.
 * Original Qur'an ya translation data ko modify nahi karte.
 */

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()

    // Arabic harakat aur Quranic marks
    .replace(
      /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,
      ""
    )

    // Arabic Tatweel: decorative stretching character
    .replace(/\u0640/g, "")

    // Arabic-Indic digits ko English digits mein badlein
    .replace(/[\u0660-\u0669]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x0660)
    )

    // Persian/Urdu digits ko English digits mein badlein
    .replace(/[\u06F0-\u06F9]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x06f0)
    )

    // Arabic letter variants
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

    // Arabic aur Urdu punctuation
    .replace(/[،؛؟۔]/g, " ")

    // English punctuation aur reference separators
    .replace(/[.,!?;:'"()[\]{}|/\\\-_=+*&^%$#@~`<>:]/g, " ")

    // Multiple spaces ko ek space banayein
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Spaces hata kar compact search representation banata hai.
 * Iska use partial matching mein hota hai.
 */
export function compactSearchText(value: string): string {
  return normalizeSearchText(value).replace(/\s+/g, "");
}

/**
 * Search query aur content ko words mein divide karta hai.
 */
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

/**
 * Normalization ke baad exact text match check karta hai.
 */
export function isExactText(
  query: string,
  text: string
): boolean {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedText = normalizeSearchText(text);

  return Boolean(normalizedQuery) &&
    normalizedQuery === normalizedText;
}

/**
 * Normalized content mein query milti hai ya nahi.
 */
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
