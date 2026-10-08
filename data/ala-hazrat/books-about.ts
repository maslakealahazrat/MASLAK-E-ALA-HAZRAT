import type { ResearchVerificationStatus } from "./research";

export type AlaHazratBookAboutCategory =
  | "biography"
  | "critical-study"
  | "poetry-study"
  | "kanz-ul-iman-study"
  | "defence"
  | "refutation"
  | "eulogy"
  | "research"
  | "other";

export type AlaHazratBookAbout = {
  id: string;
  title: string;
  author: string;
  category: AlaHazratBookAboutCategory;
  language?: "Urdu" | "Arabic" | "Persian" | "English" | "Multiple";
  description: string;
  verificationStatus: ResearchVerificationStatus;
  sourceIds: string[];
  notes?: string;
};

export const alaHazratBooksAbout: AlaHazratBookAbout[] = [
  {
    id: "hayat-e-ala-hazrat",
    title: "Hayat-e-Ala Hazrat",
    author: "Mawlana Zafaruddin Bihari",
    category: "biography",
    language: "Urdu",
    description:
      "A documented biographical work on the life of Imam Ahmad Raza Khan.",
    verificationStatus: "verified",
    sourceIds: ["ridawi-books-about"],
    notes:
      "The work is listed in Ridawi's catalogue of books about Ala Hazrat.",
  },
];

export function getAlaHazratBookAbout(
  id: string
): AlaHazratBookAbout | undefined {
  return alaHazratBooksAbout.find(
    (book) => book.id === id
  );
}

export function getAlaHazratBooksAboutByCategory(
  category: AlaHazratBookAboutCategory
): AlaHazratBookAbout[] {
  return alaHazratBooksAbout.filter(
    (book) => book.category === category
  );
}

export function getAlaHazratBooksAboutByLanguage(
  language: AlaHazratBookAbout["language"]
): AlaHazratBookAbout[] {
  return alaHazratBooksAbout.filter(
    (book) => book.language === language
  );
}
