export type SearchContentType =
  | "quran"
  | "ilm-ka-safar"
  | "hadith"
  | "naat"
  | "manqabat"
  | "kanz-ul-iman"
  | "fatawa"
  | "book"
  | "page";

export type SearchDocument = {
  id: string;
  type: SearchContentType;
  title: string;
  text: string;
  href: string;

  // Extra searchable fields
  arabic?: string;
  urdu?: string;
  hindi?: string;
  english?: string;
  roman?: string;

  surahNumber?: number;
  ayahNumber?: number;
  day?: number;
};

export type SearchResult = {
  document: SearchDocument;
  score: number;
  matchType: "exact" | "strong" | "similar";
};
