export type SearchContentType =
  | "quran"
  | "hadith"
  | "naat"
  | "manqabat"
  | "fatawa"
  | "ala-hazrat"
  | "seerat"
  | "book"
  | "article";

export type SearchItem = {
  id: string;
  type: SearchContentType;

  title: string;
  description?: string;

  href: string;

  /**
   * Search ke liye extra words.
   * Example:
   * Hindi, Urdu, Roman, English,
   * alternate spellings, keywords etc.
   */
  keywords?: string[];
};

export const siteSearchIndex: SearchItem[] = [];
