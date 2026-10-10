/**
 * Maslak-e-Ala Hazrat
 * Quran translation data
 *
 * Urdu, English aur Hindi translations ko
 * verified source aur permission milne ke baad
 * yahan organize kiya jayega.
 */

export type TranslationLanguage = "ur" | "en" | "hi";

export type QuranTranslation = {
  surahNumber: number;
  ayahNumber: number;
  text: string;
};
