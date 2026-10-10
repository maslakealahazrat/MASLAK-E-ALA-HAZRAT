/**
 * Maslak-e-Ala Hazrat
 * Quran translation data
 *
 * Translation files ko verified source aur
 * zaroori permission milne ke baad connect karenge.
 */

export type TranslationLanguage = "ur" | "en" | "hi";

export type QuranTranslation = {
  surahNumber: number;
  ayahNumber: number;
  text: string;
};

export type QuranTranslations = {
  ur?: QuranTranslation[];
  en?: QuranTranslation[];
  hi?: QuranTranslation[];
};
